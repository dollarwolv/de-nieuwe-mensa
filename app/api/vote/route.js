import config from "@payload-config";
import { getPayload } from "payload";
import { cookies } from "next/headers";
import crypto from "crypto";
import { NextResponse } from "next/server";
import { getDateYYYYMMDD } from "@/lib/helpers";

function getOrSetVoterId() {
  const jar = cookies();
  const existing = jar.get("voterId")?.value;
  if (existing) return existing;

  const id = crypto.randomUUID();
  // 180 days is fine
  jar.set("voterId", id, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    maxAge: 60 * 60 * 24 * 180,
    path: "/",
  });
  return id;
}

function parseRubricRatings(body) {
  const RUBRICS = [
    "satisfaction",
    "tastiness",
    "fillingness",
    "healthiness",
    "valueForMoney",
  ];

  const ratings = {};

  for (const key of RUBRICS) {
    const value = Number(body[key]);

    if (!Number.isFinite(value) || value < 1 || value > 10) {
      return { ok: false, error: `Invalid ${key}. Must be 1–10.` };
    }
    ratings[key] = value;
  }

  return { ok: true, ratings };
}

export async function POST(req) {
  try {
    // collects or sets voter id in a cookie and saves it in voterId variable
    const voterId = getOrSetVoterId();
    const body = await req.json();

    // checks if ratings are numerical and between 1 and 10
    const parsed = parseRubricRatings(body);
    if (!parsed.ok) {
      return NextResponse.json(parsed, { status: 400 });
    }

    // assigns ratings and remarks, voteDate, dish to variables
    const { ratings } = parsed;
    const { remarks, dish } = body;
    const voteDate = getDateYYYYMMDD();

    const payload = await getPayload({ config });

    // check if user already voted todaay
    const existing = await payload.find({
      collection: "votes",
      where: {
        and: [
          { voterId: { equals: voterId } },
          { voteDate: { equals: voteDate } },
        ],
      },
      limit: 1,
      overrideAccess: true,
    });

    // if user already voted today, update his vote.
    if (existing.docs.length) {
      const updated = await payload.update({
        collection: "votes",
        id: existing.docs[0].id,
        data: {
          ...ratings,
          remarks,
          dish,
          voterId,
          voteDate,
        },
        overrideAccess: true,
      });
      return NextResponse.json({
        ok: true,
        updated: true,
        id: updated.id,
      });
    }

    // else, create a new vote.
    const created = await payload.create({
      collection: "votes",
      data: {
        ...ratings,
        remarks,
        dish,
        voteDate,
        voterId,
      },
      overrideAccess: true,
    });

    return NextResponse.json({ ok: true, created: true, id: created.id });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { ok: false, error: "Server error." },
      { status: 500 },
    );
  }
}

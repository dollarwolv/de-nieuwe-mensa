import config from "@payload-config";
import { getPayload } from "payload";

import { mondayOfWeek, flipWeek } from "../../../lib/helpers";
import { NextResponse } from "next/server";

export async function GET(req) {
  const payload = await getPayload({ config });
  const menu = await payload.findGlobal({
    slug: "menuSettings",
    depth: 3,
  });

  const anchorDate = new Date(menu.anchorDate);
  const anchorMonday = mondayOfWeek(anchorDate);

  const searchParams = req.nextUrl.searchParams;
  const rawDate = searchParams.get("date");

  const date = new Date(rawDate);
  const thatMonday = mondayOfWeek(date);

  const msPerWeek = 1000 * 60 * 60 * 24 * 7;
  const weeksSince = Math.floor((thatMonday - anchorMonday) / msPerWeek);

  const effectiveWeek =
    weeksSince % 2 === 0 ? menu.currentWeek : flipWeek(menu.currentWeek);

  const thatWeeksMenu =
    effectiveWeek === "A" ? menu.weekADishes : menu.weekBDishes;

  // Mon–Fri index
  const weekday = date.getDay(); // Sun=0 .. Sat=6
  const isWeekend = weekday === 0 || weekday === 6;

  let dishOnDate = null;
  if (!isWeekend) {
    const dayIndex = weekday - 1; // Mon=0 .. Fri=4
    dishOnDate = thatWeeksMenu?.[dayIndex]?.dish ?? null;
  } else {
    return NextResponse.json({
      ok: false,
      error: "The date you provided is on a weekend.",
    });
  }

  return NextResponse.json({
    ok: true,
    dishOnDate,
  });
}

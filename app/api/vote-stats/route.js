export const runtime = "nodejs";
import { pool } from "@/lib/db";

import { NextResponse } from "next/server";

export async function GET(req) {
  //   const payload = await getPayload({ config });

  const RUBRICS = {
    satisfaction: `"satisfaction"`,
    tastiness: `"tastiness"`,
    fillingness: `"fillingness"`,
    healthiness: `"healthiness"`,
    valueForMoney: `"valueForMoney"`,
    all: `("satisfaction" + "tastiness" + "fillingness" + "healthiness" + "value_for_money") / 5.0`,
  };

  // get search params
  const searchParams = req.nextUrl.searchParams;
  const dateRange = searchParams.get("dateRange"); // dateRange will be something like 30, 90, 180, etc.
  const rubricKey = searchParams.get("rubrik") || "all";
  const dishId = searchParams.get("dishId");

  const rubricExpr = RUBRICS[rubricKey];
  if (!rubricExpr) {
    return NextResponse.json(
      { ok: false, error: "Invalid rubrik" },
      { status: 400 },
    );
  }

  // get date from where you should start checking
  const today = new Date();
  const startDate = new Date();
  startDate.setDate(today.getDate() - Number(dateRange));

  // complicated SQL query
  const sql = `
  SELECT
    TO_CHAR(("vote_date" AT TIME ZONE 'Asia/Singapore'), 'YYYY-MM') AS month,
    AVG(${rubricKey === "all" ? rubricExpr : `${rubricExpr}::float`}) AS avg,
    COUNT(*)::int AS count
  FROM "votes"
  WHERE "vote_date" >= $1 ${dishId ? `AND dish_id = ${dishId}` : ""}
  GROUP BY 1
  ORDER BY 1 ASC;
`;
  const result = await pool.query(sql, [startDate]);

  return NextResponse.json({ ok: true, daily: result.rows });
}

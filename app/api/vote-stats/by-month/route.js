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
    valueForMoney: `"value_for_money"`,
    all: `("satisfaction" + "tastiness" + "fillingness" + "healthiness" + "value_for_money") / 5.0`,
  };

  // get search params
  const searchParams = req.nextUrl.searchParams;
  const dateRange = searchParams.get("dateRange"); // dateRange will be something like 30, 90, 180, etc.
  const rubricKey = searchParams.get("rubrik") || "all";
  const dishId = searchParams.get("dishId");
  const groupBy = searchParams.get("groupBy");

  const rubricExpr = RUBRICS[rubricKey];
  if (!rubricExpr) {
    return NextResponse.json(
      { ok: false, error: "Invalid rubrik" },
      { status: 400 },
    );
  }

  if (dishId && !parseInt(dishId)) {
    return NextResponse.json(
      { ok: false, error: "Invalid dishID" },
      { status: 400 },
    );
  }

  // get date from where you should start checking
  const today = new Date();
  const startDate = new Date();
  startDate.setDate(today.getDate() - Number(dateRange));

  const selectAllMonths = `
    AVG("satisfaction"::float) AS satisfaction,
    AVG("tastiness"::float) AS tastiness,
    AVG("fillingness"::float) AS fillingness,
    AVG("healthiness"::float) AS healthiness,
    AVG("value_for_money"::float) AS value_for_money
  `;

  // complicated SQL query
  const sql = `
  SELECT
    ${groupBy === "day" ? "to_char(vote_date::date, 'YYYY-MM-DD') AS vote_day" : `TO_CHAR(("vote_date" AT TIME ZONE 'Asia/Singapore'), 'YYYY-MM') AS month`},
    ${rubricKey === "all" ? selectAllMonths : `AVG(${rubricExpr}::float) AS avg`},
    COUNT(*)::int AS count
  FROM "votes"
  WHERE "vote_date" >= $1 ${dishId ? `AND dish_id = $2` : ""}
  GROUP BY 1
  ORDER BY 1 ASC;
`;
  const result = await pool.query(
    sql,
    dishId ? [startDate, dishId] : [startDate],
  );

  return NextResponse.json({ ok: true, daily: result.rows, dishId: dishId });
}

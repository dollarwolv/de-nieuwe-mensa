export const runtime = "nodejs";
import { pool } from "@/lib/db";

import { NextResponse } from "next/server";

export async function GET(req) {
  // get search params
  const searchParams = req.nextUrl.searchParams;
  const dateRange = searchParams.get("dateRange"); // dateRange will be something like 30, 90, 180, etc.
  const groupBy = searchParams.get("groupBy");

  if (groupBy !== "month" && groupBy !== "day" && groupBy !== "week") {
    return NextResponse.json(
      { ok: false, error: "Invalid groupBy" },
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
    ${
      groupBy === "day"
        ? `TO_CHAR(("date" AT TIME ZONE 'Asia/Singapore'), 'YYYY-MM-DD') AS day`
        : groupBy === "month"
          ? `TO_CHAR(("date" AT TIME ZONE 'Asia/Singapore'), 'YYYY-MM') AS month`
          : `EXTRACT(DOW FROM ("date" AT TIME ZONE 'Asia/Singapore'))::int AS weekday`
    },
    ROUND(AVG(amount), 0)::int AS sales,
    COUNT(*)::int AS count
  FROM "sales_entries"
  WHERE "date" >= $1
  GROUP BY 1
  ORDER BY 1 ASC;
`;
  const result = await pool.query(sql, [startDate]);

  return NextResponse.json({ ok: true, data: result.rows });
}

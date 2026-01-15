import config from "@payload-config";
import { getPayload } from "payload";

import { startOfDay, mondayOfWeek, flipWeek } from "../../../lib/helpers";

export async function GET() {
  const payload = await getPayload({ config });

  const menu = await payload.findGlobal({
    slug: "menuSettings",
    depth: 3, // so weekADishes[].dish is populated
  });

  const anchorDate = new Date(menu.anchorDate);
  const anchorMonday = mondayOfWeek(anchorDate);

  const today = new Date();
  const thisMonday = mondayOfWeek(today);

  const msPerWeek = 1000 * 60 * 60 * 24 * 7;
  const weeksSince = Math.floor((thisMonday - anchorMonday) / msPerWeek);

  const effectiveWeek =
    weeksSince % 2 === 0 ? menu.currentWeek : flipWeek(menu.currentWeek);

  const thisWeeksMenu =
    effectiveWeek === "A" ? menu.weekADishes : menu.weekBDishes;
  const nextWeeksMenu =
    effectiveWeek === "A" ? menu.weekBDishes : menu.weekADishes;

  // Mon–Fri index
  const weekday = today.getDay(); // Sun=0 .. Sat=6
  const isWeekend = weekday === 0 || weekday === 6;

  let todaysDish = null;
  if (!isWeekend) {
    const dayIndex = weekday - 1; // Mon=0 .. Fri=4
    // Each row is like { dish: <DishDoc> } because you used type: "array"
    todaysDish = thisWeeksMenu?.[dayIndex]?.dish ?? null;
  }

  console.log({
    effectiveWeek,
    weeksSince,
    thisWeeksMenu,
    nextWeeksMenu,
    todaysDish,
  });

  return Response.json({
    effectiveWeek,
    weeksSince,
    thisWeeksMenu,
    nextWeeksMenu,
    todaysDish,
  });
}

import config from "@payload-config";
import { getPayload } from "payload";

// Helpers
function startOfDay(d) {
  const x = new Date(d);
  x.setHours(0, 0, 0, 0);
  return x;
}

// Returns a Date that is the Monday of the week containing `d`.
// If `d` is Sunday, it returns the Monday 6 days earlier (previous week).
function mondayOfWeek(d) {
  const x = startOfDay(d);
  const day = x.getDay(); // Sun=0, Mon=1, ... Sat=6
  const diff = day === 0 ? -6 : 1 - day; // move back to Monday
  x.setDate(x.getDate() + diff);
  return x;
}

function flipWeek(w) {
  return w === "A" ? "B" : "A";
}

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

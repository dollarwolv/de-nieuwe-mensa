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

function getDateYYYYMMDD(date = new Date()) {
  const parts = new Intl.DateTimeFormat("en-CA", {
    timeZone: "Europe/Brussels",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).formatToParts(date);

  const y = parts.find((p) => p.type === "year").value;
  const m = parts.find((p) => p.type === "month").value;
  const d = parts.find((p) => p.type === "day").value;
  return `${y}-${m}-${d}`;
}

export { startOfDay, mondayOfWeek, flipWeek, getDateYYYYMMDD };

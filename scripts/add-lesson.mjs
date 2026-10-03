import { readFileSync, writeFileSync } from "node:fs";

const date = process.argv[2];
if (!/^\d{4}-\d{2}-\d{2}$/.test(date || "")) throw new Error("Gebruik: node scripts/add-lesson.mjs YYYY-MM-DD");
const root = new URL("../content/daily/", import.meta.url);
const lesson = JSON.parse(readFileSync(new URL(`${date}.json`, root), "utf8"));
if (lesson.date !== date || !lesson.title || !lesson.thinkerId) throw new Error("Datum, titel of denker ontbreekt in de les");
const url = new URL("index.json", root);
const index = JSON.parse(readFileSync(url, "utf8"));
index.lessons = [
  ...index.lessons.filter((entry) => entry.date !== date),
  { date, title: lesson.title, thinkerId: lesson.thinkerId }
].sort((a, b) => b.date.localeCompare(a.date));
writeFileSync(url, JSON.stringify(index, null, 2) + "\n");
console.log(`${date} opgenomen in de lessenlijst`);

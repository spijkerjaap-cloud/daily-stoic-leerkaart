import { readFileSync, existsSync } from "node:fs";

const root = new URL("../content/daily/", import.meta.url);
const read = (name) => JSON.parse(readFileSync(new URL(name, root), "utf8"));
const fail = (message) => { throw new Error(message); };
const text = (value, label) => {
  if (typeof value !== "string" || !value.trim()) fail(`${label} moet een niet-lege tekst zijn`);
};
const list = (value, label, min, max) => {
  if (!Array.isArray(value) || value.length < min || value.length > max) fail(`${label} moet ${min}–${max} onderdelen bevatten`);
};

const index = read("index.json");
if (index.schemaVersion !== 1) fail("Onbekende indexversie");
list(index.lessons, "lessons", 1, 1000);
const dates = new Set();
for (const entry of index.lessons) {
  text(entry.date, "datum");
  if (!/^\d{4}-\d{2}-\d{2}$/.test(entry.date) || Number.isNaN(Date.parse(entry.date + "T12:00:00Z"))) fail("Ongeldige datum: " + entry.date);
  if (dates.has(entry.date)) fail("Dubbele datum: " + entry.date);
  dates.add(entry.date);
  text(entry.title, "titel");
  text(entry.thinkerId, "denker");
  const file = `${entry.date}.json`;
  if (!existsSync(new URL(file, root))) fail("Ontbrekend lesbestand: " + file);
  const lesson = read(file);
  if (lesson.date !== entry.date || lesson.title !== entry.title || lesson.thinkerId !== entry.thinkerId) fail("Index en les verschillen: " + file);
  for (const key of ["theme", "passage", "attribution", "theory", "explain", "exercise", "reflection", "remember"]) text(lesson[key], `${file}: ${key}`);
  text(lesson.source?.label, `${file}: bronlabel`);
  if (typeof lesson.source?.url !== "string" || !lesson.source.url.startsWith("https://")) fail(`${file}: bron moet HTTPS gebruiken`);
  list(lesson.facts, `${file}: feiten`, 3, 5);
  lesson.facts.forEach((item) => text(item, `${file}: feit`));
  list(lesson.connections, `${file}: verbanden`, 1, 5);
  lesson.connections.forEach((item) => text(item, `${file}: verband`));
  list(lesson.diagram, `${file}: schema`, 2, 5);
  lesson.diagram.forEach((item) => text(item, `${file}: schemastap`));
  list(lesson.concepts, `${file}: begrippen`, 2, 5);
  lesson.concepts.forEach((item) => ["term", "meaning", "example"].forEach((key) => text(item[key], `${file}: begrip.${key}`)));
  ["situation", "automatic", "stoic"].forEach((key) => text(lesson.modernExample?.[key], `${file}: voorbeeld.${key}`));
  ["name", "concept", "sentence"].forEach((key) => text(lesson.knowledgeAnchor?.[key], `${file}: kennisanker.${key}`));
}
console.log(`${index.lessons.length} dagelijkse les(sen) geldig`);

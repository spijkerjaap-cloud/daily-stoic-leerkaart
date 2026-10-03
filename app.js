const dateLabel = document.querySelector("#dateLabel");
const dayLabel = document.querySelector("#dayLabel");

const now = new Date();
dateLabel.textContent = now.toLocaleDateString("nl-NL", {
  day: "numeric",
  month: "short"
});
dayLabel.textContent = now.toLocaleDateString("nl-NL", { weekday: "long" });

if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker.register("./sw.js").catch(() => {});
  });
}

const games = [
  { name: "Fast Friends", category: ["party", "beginner"], players: "4 to 10", time: "20 min", level: "Easy", branch: "Both branches", stock: "Available", color: "#ff725f", number: "01", subtitle: "BREAK THE ICE" },
  { name: "Quiet Kingdoms", category: ["strategy"], players: "2 to 4", time: "75 min", level: "Medium", branch: "Damansara Jaya", stock: "2 copies left", color: "#6479ff", number: "02", subtitle: "BUILD YOUR REALM" },
  { name: "Two of Us", category: ["couples", "beginner"], players: "2", time: "30 min", level: "Easy", branch: "Both branches", stock: "Available", color: "#ff8ec7", number: "03", subtitle: "A TINY DUEL" },
  { name: "Who Said That?", category: ["party", "social"], players: "5 to 12", time: "25 min", level: "Easy", branch: "Tamarind Square", stock: "Available", color: "#c9ff4a", number: "04", subtitle: "BLUFF BETTER" },
  { name: "Night Market", category: ["strategy", "beginner"], players: "3 to 5", time: "45 min", level: "Medium", branch: "Both branches", stock: "Available", color: "#ffcf52", number: "05", subtitle: "TRADE AFTER DARK" },
  { name: "The Alibi", category: ["social", "party"], players: "6 to 10", time: "40 min", level: "Easy", branch: "Damansara Jaya", stock: "1 copy left", color: "#bba7ff", number: "06", subtitle: "TRUST NO ONE" },
  { name: "Pocket Planets", category: ["strategy", "couples"], players: "2 to 4", time: "60 min", level: "Hard", branch: "Tamarind Square", stock: "Available", color: "#8bd4c1", number: "07", subtitle: "ORBIT AND OUTSMART" },
  { name: "Snack Attack", category: ["party", "beginner"], players: "3 to 8", time: "15 min", level: "Easy", branch: "Both branches", stock: "Available", color: "#f48b5f", number: "08", subtitle: "GRAB. STACK. WIN." }
];

const gameGrid = document.getElementById("gameGrid");
const gameSearch = document.getElementById("gameSearch");
const filterButtons = document.querySelectorAll("[data-game-filter]");
const emptyGames = document.getElementById("emptyGames");
let activeFilter = "all";

function renderGames() {
  const query = (gameSearch?.value || "").trim().toLowerCase();
  const filtered = games.filter((game) => {
    const matchesCategory = activeFilter === "all" || game.category.includes(activeFilter);
    const haystack = `${game.name} ${game.subtitle} ${game.category.join(" ")} ${game.level}`.toLowerCase();
    return matchesCategory && haystack.includes(query);
  });

  gameGrid.innerHTML = filtered.map((game) => {
    const low = game.stock.includes("left");
    return `
      <article class="game-item">
        <div class="game-cover" style="background:${game.color}">
          <small>${game.subtitle}</small>
          <strong>${game.name}</strong>
          <span>${game.number}</span>
        </div>
        <div class="game-info">
          <div class="game-topline">
            <h3>${game.name}</h3>
            <span class="availability ${low ? "low" : ""}">${game.stock}</span>
          </div>
          <div class="game-meta">
            <span>♟ ${game.players}</span>
            <span>◷ ${game.time}</span>
            <span>◆ ${game.level}</span>
            <span>⌂ ${game.branch}</span>
          </div>
        </div>
      </article>`;
  }).join("");

  emptyGames.hidden = filtered.length !== 0;
}

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    activeFilter = button.dataset.gameFilter;
    filterButtons.forEach((item) => item.classList.toggle("active", item === button));
    renderGames();
  });
});

gameSearch?.addEventListener("input", renderGames);
renderGames();

document.querySelectorAll("[data-filter-jump]").forEach((card) => {
  card.addEventListener("click", () => {
    activeFilter = card.dataset.filterJump;
    filterButtons.forEach((item) => item.classList.toggle("active", item.dataset.gameFilter === activeFilter));
    renderGames();
    document.getElementById("games").scrollIntoView({ behavior: "smooth" });
  });
});

const today = new Date();
const minDate = today.toISOString().split("T")[0];
const defaultDate = new Date(today.getTime() + 86400000).toISOString().split("T")[0];
["quickDate", "modalDate"].forEach((id) => {
  const input = document.getElementById(id);
  if (input) {
    input.min = minDate;
    input.value = defaultDate;
  }
});

const modal = document.getElementById("bookingModal");
const bookingFormView = document.getElementById("bookingFormView");
const bookingSuccessView = document.getElementById("bookingSuccessView");
const modalBranch = document.getElementById("modalBranch");
const modalType = document.getElementById("modalType");
const modalDate = document.getElementById("modalDate");
const modalTime = document.getElementById("modalTime");
const modalPlayers = document.getElementById("modalPlayers");
const depositValue = document.getElementById("depositValue");
let lastFocusedElement = null;

function calculateDeposit() {
  const players = Math.max(1, Number(modalPlayers.value || 1));
  const type = modalType.value;
  let deposit = 30;
  if (type === "Private room") deposit = 100;
  if (type === "Event ticket") deposit = players * 30;
  depositValue.textContent = `RM${deposit}`;
}

function openBooking(options = {}) {
  lastFocusedElement = document.activeElement;
  bookingFormView.hidden = false;
  bookingSuccessView.hidden = true;
  document.getElementById("bookingForm").reset();
  modalDate.value = options.date || document.getElementById("quickDate")?.value || defaultDate;
  modalBranch.value = options.branch || document.getElementById("quickBranch")?.value || "Damansara Jaya";
  modalTime.value = options.time || document.getElementById("quickTime")?.value || "7:00 PM";
  modalPlayers.value = options.players || parseInt(document.getElementById("quickPlayers")?.value, 10) || 4;
  modalType.value = options.type || "General table";
  calculateDeposit();
  modal.classList.add("open");
  modal.setAttribute("aria-hidden", "false");
  document.body.classList.add("modal-open");
  setTimeout(() => modal.querySelector(".modal-close")?.focus(), 50);
}

function closeBooking() {
  modal.classList.remove("open");
  modal.setAttribute("aria-hidden", "true");
  document.body.classList.remove("modal-open");
  if (lastFocusedElement) lastFocusedElement.focus();
}

document.querySelectorAll("[data-open-booking]").forEach((button) => button.addEventListener("click", () => openBooking()));
document.querySelectorAll("[data-close-booking]").forEach((button) => button.addEventListener("click", closeBooking));
document.querySelectorAll("[data-branch-booking]").forEach((button) => button.addEventListener("click", () => openBooking({ branch: button.dataset.branchBooking })));
document.querySelectorAll("[data-event-booking]").forEach((button) => button.addEventListener("click", () => openBooking({ type: "Event ticket" })));

modalType.addEventListener("change", calculateDeposit);
modalPlayers.addEventListener("input", calculateDeposit);

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && modal.classList.contains("open")) closeBooking();
});

document.getElementById("bookingForm").addEventListener("submit", (event) => {
  event.preventDefault();
  const ref = `BORED-${Math.floor(1000 + Math.random() * 9000)}`;
  document.getElementById("bookingReference").textContent = ref;
  document.getElementById("successDetails").textContent = `${modalPlayers.value} player${Number(modalPlayers.value) === 1 ? "" : "s"} at ${modalBranch.value}, ${modalDate.value}, ${modalTime.value}.`;
  bookingFormView.hidden = true;
  bookingSuccessView.hidden = false;
});

const guestRange = document.getElementById("guestRange");
const eventType = document.getElementById("eventType");
const guestCount = document.getElementById("guestCount");
const estimateValue = document.getElementById("estimateValue");
const eventAddons = document.querySelectorAll(".event-addon");

function updateEstimate() {
  const guests = Number(guestRange.value);
  guestCount.textContent = guests;
  const bases = { birthday: 420, corporate: 650, venue: 1500 };
  const perGuest = { birthday: 15, corporate: 22, venue: 8 };
  const addons = [...eventAddons].filter((item) => item.checked).reduce((total, item) => total + Number(item.value), 0);
  const total = bases[eventType.value] + guests * perGuest[eventType.value] + addons;
  estimateValue.textContent = `RM${total.toLocaleString("en-MY")}`;
}

[guestRange, eventType, ...eventAddons].forEach((element) => element.addEventListener("input", updateEstimate));
updateEstimate();

let toastTimer;
function showToast(message) {
  const toast = document.getElementById("toast");
  toast.textContent = message;
  toast.classList.add("show");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove("show"), 3200);
}

document.getElementById("quoteButton").addEventListener("click", () => showToast("Demo quote request created. The live version would send this to the branch dashboard."));
document.getElementById("joinWaitlist").addEventListener("click", () => showToast("You are on the prototype membership waitlist."));

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll(".reveal").forEach((element) => observer.observe(element));

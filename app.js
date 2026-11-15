// app.js: connect API, search, sorting, filters and buttons.
let allCoins = [];
let currency = "usd";
let activeFilter = "all";
let searchTimer;

const searchInput = document.getElementById("searchInput");
const sortSelect = document.getElementById("sortSelect");
const refreshButton = document.getElementById("refreshButton");

function updateCounts(coins) {
  document.getElementById("coinCount").textContent = coins.length;
  document.getElementById("favoriteCount").textContent = getFavorites().length;
}

function showCoins() {
  let visibleCoins = allCoins;

  const searchText = searchInput.value.trim().toLowerCase();

  // filter() is used for searching and favorites.
  visibleCoins = visibleCoins.filter(function (coin) {
    const matchesSearch = coin.name.toLowerCase().includes(searchText) ||
      coin.symbol.toLowerCase().includes(searchText);
    const matchesFavorite = activeFilter === "all" || isFavorite(coin.id);
    return matchesSearch && matchesFavorite;
  });

  // sort() changes the order based on the selected option.
  if (sortSelect.value === "price") {
    visibleCoins = visibleCoins.sort(function (a, b) {
      return b.current_price - a.current_price;
    });
  } else if (sortSelect.value === "change") {
    visibleCoins = visibleCoins.sort(function (a, b) {
      return (b.price_change_percentage_24h || 0) - (a.price_change_percentage_24h || 0);
    });
  } else if (sortSelect.value === "marketCap") {
    visibleCoins = visibleCoins.sort(function (a, b) {
      return b.market_cap - a.market_cap;
    });
  } else {
    visibleCoins = visibleCoins.sort(function (a, b) {
      return a.market_cap_rank - b.market_cap_rank;
    });
  }

  // find() is used to get a coin from the current data when needed.
  const firstCoin = allCoins.find(function (coin) {
    return coin.id === "bitcoin";
  });
  if (firstCoin) {
    document.getElementById("lastUpdated").title = "Bitcoin price: " + formatMoney(firstCoin.current_price, currency);
  }

  renderCoins(visibleCoins, currency);
  updateCounts(visibleCoins);
}

async function loadCoins() {
  refreshButton.disabled = true;
  document.getElementById("refreshText").textContent = "Refreshing...";
  showLoading();

  // A rejected async request is handled with a Promise rejection handler, not try...catch.
  getCoins(currency).then(function (coins) {
    allCoins = coins;
    document.getElementById("lastUpdated").textContent = new Date().toLocaleTimeString();
    showCoins();
  }, function (error) {
    showMessage(error.message || "Something went wrong. Please try again.", "error");
    document.getElementById("coinCount").textContent = "—";
  }).finally(function () {
    refreshButton.disabled = false;
    document.getElementById("refreshText").textContent = "Refresh prices";
  });
}

refreshButton.addEventListener("click", loadCoins);

searchInput.addEventListener("input", function () {
  clearTimeout(searchTimer);
  searchTimer = setTimeout(showCoins, 250);
});

sortSelect.addEventListener("change", showCoins);

// Event delegation: one listener handles every favorite button in the table.
document.getElementById("coinList").addEventListener("click", function (event) {
  const button = event.target.closest("[data-favorite]");
  if (!button) return;

  const coinId = button.dataset.favorite;
  toggleFavorite(coinId);
  showCoins();
});

document.querySelectorAll(".filterButton").forEach(function (button) {
  button.addEventListener("click", function () {
    activeFilter = button.dataset.filter;

    document.querySelectorAll(".filterButton").forEach(function (item) {
      item.className = "filterButton rounded-lg border border-slate-700 px-3 py-2 text-sm font-semibold text-slate-300 hover:bg-slate-800";
    });
    button.className = "filterButton rounded-lg bg-cyan-400 px-3 py-2 text-sm font-bold text-slate-950";
    showCoins();
  });
});

document.getElementById("currencyButton").addEventListener("click", function () {
  currency = currency === "usd" ? "inr" : "usd";
  this.textContent = "Currency: " + currency.toUpperCase();
  loadCoins();
});

document.getElementById("themeButton").addEventListener("click", function () {
  document.body.classList.toggle("light-mode");
});

loadCoins();

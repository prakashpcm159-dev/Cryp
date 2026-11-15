// ui.js: create and update the interface with DOM methods.
function formatMoney(value, currency = "usd") {
  if (value === null || value === undefined || Number.isNaN(Number(value))) {
    return "—";
  }

  const locale = currency === "inr" ? "en-IN" : "en-US";
  const symbol = currency === "inr" ? "₹" : "$";
  const digits = Number(value) < 1 ? 6 : 2;

  return symbol + Number(value).toLocaleString(locale, {
    minimumFractionDigits: 2,
    maximumFractionDigits: digits
  });
}

function formatCompactMoney(value, currency = "usd") {
  if (value === null || value === undefined || Number.isNaN(Number(value))) {
    return "—";
  }

  const locale = currency === "inr" ? "en-IN" : "en-US";
  const symbol = currency === "inr" ? "₹" : "$";

  return symbol + Number(value).toLocaleString(locale, {
    notation: "compact",
    maximumFractionDigits: 2
  });
}

function showLoading() {
  const statusArea = document.getElementById("statusArea");
  const coinList = document.getElementById("coinList");
  document.getElementById("tableWrap").classList.remove("hidden");
  statusArea.classList.add("hidden");
  coinList.innerHTML = "";

  for (let i = 0; i < 6; i++) {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td class="px-5 py-5"><div class="skeleton h-4 w-32"></div><div class="skeleton mt-2 h-3 w-16"></div></td>
      <td class="px-5 py-5"><div class="skeleton ml-auto h-4 w-20"></div></td>
      <td class="px-5 py-5"><div class="skeleton ml-auto h-4 w-16"></div></td>
      <td class="px-5 py-5"><div class="skeleton ml-auto h-4 w-24"></div></td>
      <td class="px-5 py-5"><div class="skeleton mx-auto h-7 w-8"></div></td>`;
    coinList.appendChild(row);
  }
}

function showMessage(message, type = "error") {
  const statusArea = document.getElementById("statusArea");
  document.getElementById("coinList").innerHTML = "";
  document.getElementById("tableWrap").classList.remove("hidden");
  statusArea.className = "p-6";
  statusArea.innerHTML = "";

  const box = document.createElement("div");
  box.className = type === "error"
    ? "rounded-xl border border-red-500/30 bg-red-500/10 p-5 text-red-300"
    : "rounded-xl border border-slate-700 bg-slate-950 p-5 text-center text-slate-300";
  box.textContent = message;
  statusArea.appendChild(box);
}

function renderCoins(coins, currency = "usd") {
  const coinList = document.getElementById("coinList");
  const statusArea = document.getElementById("statusArea");
  coinList.innerHTML = "";
  statusArea.classList.add("hidden");

  if (coins.length === 0) {
    showMessage("No results found. Try another search.", "empty");
    return;
  }

  coins.forEach(function (coin) {
    const row = document.createElement("tr");
    row.className = "coin-row";
    const change = Number(coin.price_change_percentage_24h || 0);
    const changeClass = change >= 0 ? "text-emerald-400" : "text-red-400";
    const changeSign = change > 0 ? "+" : "";
    const favorite = isFavorite(coin.id);

    row.innerHTML = `
      <td class="px-5 py-4">
        <div class="flex items-center gap-3">
          <span class="w-5 text-xs text-slate-500">${coin.market_cap_rank || "—"}</span>
          <img src="${coin.image}" alt="" class="h-9 w-9 rounded-full" loading="lazy">
          <div>
            <p class="font-semibold text-slate-100">${coin.name}</p>
            <p class="text-xs uppercase text-slate-500">${coin.symbol}</p>
          </div>
        </div>
      </td>
      <td class="px-5 py-4 text-right font-semibold text-slate-100">${formatMoney(coin.current_price, currency)}</td>
      <td class="px-5 py-4 text-right font-semibold ${changeClass}">${changeSign}${change.toFixed(2)}%</td>
      <td class="px-5 py-4 text-right text-slate-300">${formatCompactMoney(coin.market_cap, currency)}</td>
      <td class="px-5 py-4 text-center">
        <button type="button" class="favorite-button rounded-lg px-3 py-2 text-lg hover:bg-slate-800 ${favorite ? "text-amber-400" : "text-slate-500"}"
          data-favorite="${coin.id}" aria-label="${favorite ? "Remove from" : "Add to"} favorites" aria-pressed="${favorite}">${favorite ? "★" : "☆"}</button>
      </td>`;
    coinList.appendChild(row);
  });
}

// api.js: fetch the latest cryptocurrency market data.
async function getCoins(currency = "usd") {
  const url = `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency}&order=market_cap_desc&per_page=20&page=1&sparkline=false`;

  const response = await fetch(url);

  // Check HTTP errors without try...catch.
  if (!response.ok) {
    throw new Error("Could not load market data. Please refresh in a moment.");
  }

  const coins = await response.json();

  if (!Array.isArray(coins)) {
    throw new Error("The API returned data in an unexpected format.");
  }

  return coins;
}

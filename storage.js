// storage.js: save and remove favorite coin IDs in LocalStorage.
function getFavorites() {
  const saved = localStorage.getItem("cryptoFavorites");
  return saved ? JSON.parse(saved) : [];
}

function saveFavorites(favorites) {
  localStorage.setItem("cryptoFavorites", JSON.stringify(favorites));
}

function toggleFavorite(coinId) {
  let favorites = getFavorites();

  if (favorites.includes(coinId)) {
    favorites = favorites.filter(function (id) {
      return id !== coinId;
    });
  } else {
    favorites.push(coinId);
  }

  saveFavorites(favorites);
  return favorites;
}

function isFavorite(coinId) {
  return getFavorites().includes(coinId);
}

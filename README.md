# CryptoView — Crypto Market Dashboard

A beginner-friendly cryptocurrency dashboard made with HTML, Tailwind CSS and Vanilla JavaScript.

## Features
- Top 20 coins from the CoinGecko markets API
- Price, 24-hour percentage change and market cap
- Green positive movement and red negative movement
- Refresh without reloading the page
- Debounced search by coin name or symbol
- Sort by rank, price, 24-hour change or market cap
- Favorites saved in LocalStorage
- USD / INR currency toggle
- Light-mode toggle
- Loading skeleton, API error message and empty-search state
- Responsive layout for desktop and mobile

## Files
- `index.html` — page structure and Tailwind utility classes
- `css/style.css` — small extra styles and light-mode overrides
- `js/api.js` — API request
- `js/ui.js` — DOM rendering and number formatting
- `js/storage.js` — LocalStorage favorites
- `js/app.js` — event listeners and application logic

## API
CoinGecko public markets endpoint:
`https://api.coingecko.com/api/v3/coins/markets`

The public API may rate-limit requests. If data does not load, wait a moment and press Refresh.

## Run locally
1. Open this folder in VS Code.
2. Start `index.html` with the VS Code Live Server extension, or use another local static server.
3. An internet connection is needed for Tailwind CDN and the CoinGecko API.

## Deploy to Vercel
1. Push the project to a GitHub repository.
2. Import the repository in Vercel.
3. Framework preset: **Other**.
4. Build command: leave empty.
5. Output directory: `.` (or leave default for a static site).
6. Deploy.

## Live link and screenshots
After deployment, add your Vercel URL here and add screenshots to this README.

## Notes
Educational demo only; not financial advice. The Tailwind CDN is convenient for learning. For a production deployment, use Tailwind's build process.

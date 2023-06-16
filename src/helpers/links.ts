const apiKey = import.meta.env.VITE_NEWS_API_KEY
const CURRENCY_API_URL: string = "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=250&page=1&sparkline=true&price_change_percentage=7d&locale=en"
const NEWS_API_URL = `https://newsdata.io/api/1/news?apikey=${apiKey}&language=en&q=cryptocurrency`

export { CURRENCY_API_URL, NEWS_API_URL }
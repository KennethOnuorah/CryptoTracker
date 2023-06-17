const apiKey = import.meta.env.VITE_NEWS_API_KEY
let [month, day, year] = new Date().toLocaleDateString().split('/')
day = (JSON.parse(day) - 1).toString()

const CURRENCY_API_URL = "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=250&page=1&sparkline=true&price_change_percentage=7d&locale=en"
const NEWS_API_URL = `https://newsapi.org/v2/everything?domains=coindesk.com,decrypt.co,bitcoinmagazine.com,theblock.co,beincrypto.com&pageSize=6&language=en&from=${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}&sortBy=popularity&apiKey=${apiKey}`

export { CURRENCY_API_URL, NEWS_API_URL }
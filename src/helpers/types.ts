//CURRENCY
type PriceTimeline = {
  price: number[]
}
export type CoinData = {
  id: string,
  symbol: string,
  name: string,
  image: string,
  current_price: number,
  market_cap: number,
  market_cap_rank: number,
  fully_diluted_valuation: number,
  total_volume: number,
  high_24h: number,
  low_24h: number,
  price_change_24h: number,
  price_change_percentage_24h: number,
  market_cap_change_24h: number,
  market_cap_change_percentage_24h: number,
  circulating_supply: number,
  total_supply: number,
  max_supply: number,
  ath: number,
  ath_change_percentage: number,
  ath_date: string,
  atl: number,
  atl_change_percentage: number,
  atl_date: string,
  roi: any,
  last_updated: string,
  sparkline_in_7d?: PriceTimeline,
  price_change_percentage_7d_in_currency?: number,
}
export type FieldProperties = {
  name: string,
  styledName: string | JSX.Element,
  sortType: SortType
}
export type SortType = 'market_cap_rank' | 'name' | 'current_price' | 'price_change_percentage_24h' | 'market_cap'

//NEWS
type Source = {
  id: string,
  name: string
}
export type NewsArticle = {
  source: Source
  author: string,
  title: string,
  description: string,
  url: string,
  urlToImage: string,
  publishedAt: string,
  content: string
}
export type NewsData = {
  status: string,
  totalResults: number,
  articles: NewsArticle[],
}
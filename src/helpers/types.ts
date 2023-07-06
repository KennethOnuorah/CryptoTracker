//CURRENCY
export interface ExchangeData {
  "result": string,
	"documentation": string,
	"terms_of_use": string,
	"time_last_update_unix": number,
	"time_last_update_utc": string,
	"time_next_update_unix": number,
	"time_next_update_utc": string,
	"base_code": string,
	"conversion_rates": {
		[key: string]: number
	}
}
export interface CoinData {
  id: string
  symbol: string
  name: string
  image: string
  current_price: number
  market_cap: number
  market_cap_rank: number
  fully_diluted_valuation: number
  total_volume: number
  high_24h: number
  low_24h: number
  price_change_24h: number
  price_change_percentage_24h: number
  market_cap_change_24h: number
  market_cap_change_percentage_24h: number
  circulating_supply: number
  total_supply: number
  max_supply: number
  ath: number
  ath_change_percentage: number
  ath_date: string
  atl: number
  atl_change_percentage: number
  atl_date: string
  roi: any
  last_updated: string
  sparkline_in_7d?: {
    price: number[]
  }
  price_change_percentage_7d_in_currency?: number
}
export type CoinDataSortType = 'market_cap_rank' | 'name' | 'current_price' | 'price_change_percentage_24h' | 'market_cap'
export interface FieldProperties {
  name: string
  styledName: string | JSX.Element
  sortType: CoinDataSortType
}

//NEWS
interface Source {
  id: string
  name: string
}
export interface NewsArticle {
  source: Source
  author: string
  title: string
  description: string
  url: string
  urlToImage: string
  publishedAt: string
  content: string
}
export interface NewsData {
  status: string
  totalResults: number
  articles: NewsArticle[]
}

//GRAPHS
export interface Coordinate {
  x: number | string
  y: number
}
export type TimeFilter = '1d' | '3d' | '5d' | '7d'
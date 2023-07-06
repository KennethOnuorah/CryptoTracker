import { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from "./redux"
import { setCoordinates } from "../../redux/slices/lineChart"

import { subtractHours } from '../utils/subtractHours'
import { getStandardTime } from '../utils/getStandardTime'
import { CoinData, Coordinate, TimeFilter } from "../helpers/types"

interface UseUpdatePlotDataProps{
  prices: number[]
  analyzedToken: CoinData
  timeLastUpdated: string
  timeFilter: TimeFilter
}

const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
const filterCoordinates = (list: Coordinate[], filter: TimeFilter) => {
  switch (filter) {
    case '1d':
      list = list?.slice(list.length - 24)
      return list
    case '3d':
      list = list?.slice(list.length - 72)
      return list
    case '5d': 
      list = list?.slice(list.length - 120)
      return list
    case '7d':
      return list
    default:
      break
  }
}

const useUpdatePlotData = ({ prices, analyzedToken, timeLastUpdated, timeFilter } : UseUpdatePlotDataProps) => {
  const dispatch = useAppDispatch()
  const coordinates = useAppSelector(state => state.lineChartReducer.coordinates)

  useEffect(() => {
    dispatch(setCoordinates(prices?.map((price, index): Coordinate => {
      const x: Date = subtractHours(new Date(timeLastUpdated), (prices.length + 1) - index)
      const [,month,day,,time,,] = x.toString().split(' ')
      return {
        x: `${months.indexOf(month)}/${day}, ${getStandardTime(time)}`, 
        y: parseFloat(price.toFixed(2))
      }
    })))
  }, [analyzedToken])

  const currentPlotData = filterCoordinates(coordinates, timeFilter)
  return currentPlotData
}

export default useUpdatePlotData

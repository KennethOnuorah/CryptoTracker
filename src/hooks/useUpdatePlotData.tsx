import { useEffect } from 'react'
import { useAppDispatch } from "./redux"
import { setPlot } from "../../redux/slices/lineChart"

import { subtractHours } from '../utils/subtractHours'
import { getStandardTime } from '../utils/getStandardTime'
import { Coordinate, TimeFilter } from "../helpers/types"

interface UseUpdatePlotDataProps{
  prices: number[],
  timeLastUpdated: string,
  timeFilter: TimeFilter
}

const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
const filterPrices = (list: number[], filter: TimeFilter) => {
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

const useUpdatePlotData = ({ prices, timeLastUpdated, timeFilter } : UseUpdatePlotDataProps, deps: any[]) => {
  const dispatch = useAppDispatch()

  useEffect(() => {
    const newPrices = filterPrices(prices, timeFilter)
    dispatch(setPlot(newPrices?.map((price, index): Coordinate => {
      const x: Date = subtractHours(new Date(timeLastUpdated), (newPrices.length + 1) - index)
      const [,month,day,,time,,] = x.toString().split(' ')
      return {
        x: `${months.indexOf(month)}/${day}, ${getStandardTime(time)}`, 
        y: parseFloat(price.toFixed(2))
      }
    })))
  }, deps)
}

export default useUpdatePlotData

import { useEffect, useState } from 'react'
import { useAppDispatch } from "./redux"

import { subtractHours } from '../utils/subtractHours'
import { getStandardTime } from '../utils/getStandardTime'
import { filterCoordinates } from '../utils/filterCoordinates'

import { ActionCreatorWithPayload } from "@reduxjs/toolkit"
import { CoinData, Coordinate, TimeFilter } from "../helpers/types"
import { months } from '../helpers/months'

interface UseLineChartProps{
  prices: number[]
  action?: ActionCreatorWithPayload<any, string>
  analyzedToken: CoinData
  timeLastUpdated: string
  timeFilter: TimeFilter
}

const useLineChart = ({ ...props } : UseLineChartProps) => {
  const dispatch = useAppDispatch()
  const [coordinates, setCoordinates] = useState<Coordinate[]>([])

  useEffect(() => {
    const newPrices = props.prices?.map((price, index): Coordinate => {
      const x: Date = subtractHours(new Date(props.timeLastUpdated), (props.prices.length + 1) - index)
      const [,month,day,,time,,] = x.toString().split(' ')
      return {
        x: `${months.indexOf(month)}/${day}, ${getStandardTime(time)}`, 
        y: parseFloat(price.toFixed(2))
      }
    })
    setCoordinates([...newPrices])
    if(!props.action) return
    dispatch(props.action([...newPrices]))
  }, [props.analyzedToken])

  const plotData = filterCoordinates(coordinates, props.timeFilter)
  return plotData as Coordinate[]
}

export default useLineChart

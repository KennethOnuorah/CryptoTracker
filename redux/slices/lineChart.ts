import { createSlice } from '@reduxjs/toolkit'
import { Coordinate } from '../../src/helpers/types'

interface initialChartDataProps{
  coordinates: Coordinate[]
  currentPlot: Coordinate[]
}

const initialState: initialChartDataProps = {
  coordinates: [],
  currentPlot: []
}

export const lineChart = createSlice({
  name: 'lineChart',
  initialState,
  reducers: {
    setCoordinates: (state, action): void => {
      state.coordinates = [...action.payload]
    },
    setCurrentPlot: (state, action): void => {
      state.currentPlot = [...action.payload]
    }
  }
})

export const { setCoordinates, setCurrentPlot } = lineChart.actions
export default lineChart.reducer
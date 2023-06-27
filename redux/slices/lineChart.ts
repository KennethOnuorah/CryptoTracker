import { createSlice } from '@reduxjs/toolkit'
import { Coordinate } from '../../src/helpers/types'

interface initialChartDataProps{
  plotData: Coordinate[]
}

const initialState: initialChartDataProps = {
  plotData: []
}

export const lineChart = createSlice({
  name: 'lineChart',
  initialState,
  reducers: {
    setPlot: (state, action): void => {
      state.plotData = [...action.payload]
    }
  }
})

export const { setPlot } = lineChart.actions
export default lineChart.reducer
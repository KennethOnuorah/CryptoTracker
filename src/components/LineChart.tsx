import { useState } from 'react'
import Chart from 'react-apexcharts'
import { ApexOptions } from 'apexcharts'

import { abbreviate } from '../utils/abbreviateNumber'
import { Coordinate, TimeFilter } from '../helpers/types'

import "./LineChart.css"
import { subtractHours } from '../utils/subtractHours'

interface LineChartProps{
  plotData: Coordinate[],
  yLabel: string,
  timeFilter: TimeFilter,
  timeLastUpdated: string
}

const LineChart = ({ plotData, yLabel, timeFilter, timeLastUpdated } : LineChartProps) => {

  const options: ApexOptions = {
    chart: {
      id: "linechart",
      toolbar: {
        show: false
      },
    },
    colors: ['#DAA520'],
    dataLabels: {
      enabled: false,
    },
    fill: {
      type: "gradient",
      gradient: {
        shadeIntensity: 0.4,
        opacityFrom: 0.6,
        opacityTo: 0.15,
        stops: [0, 100],
        inverseColors: true,
      }
    },
    grid: {
      padding: {
        right: -15,
      },
    },
    stroke:{
      width: 2,
      colors: ['#DAA520'],
      curve: 'straight',
    },
    tooltip:{
      y: {
        formatter(val){
          return '$' + val.toLocaleString()
        }
      },
    },
    xaxis: {
      type: 'category',
      labels: {
        rotate: 0,
        formatter(value){
          return timeFilter === '1d' ? value?.split(', ')[1] : value
        },
        showDuplicates: false,
      },
      crosshairs:{
        stroke: {
          dashArray: 0,
          color: '#00000018'
        }
      },
      categories: plotData.map(coord => coord.x),
      tickAmount: parseInt(timeFilter.slice(0, 1)),
      tickPlacement: 'between',
      axisTicks: {
        borderType: 'dotted',
        show: false
      },
      axisBorder: {
        show: false,
      },
      tooltip: {
        enabled: false,
      },
    },
    yaxis: {
      labels: {
        formatter(value) {
          return "$" + abbreviate(value)
        },
        offsetY: 3,
      },
    },
  }
  const series: ApexAxisChartSeries = [
    {
      name: yLabel,
      data: plotData.map(coord => coord.y)
    }
  ]

  return (
    <Chart
      options={options}
      series={series}
      type='area'
    />
  )
}

export default LineChart

import Chart from 'react-apexcharts'
import { ApexOptions } from 'apexcharts'

import { useState } from 'react'
import { useAppSelector } from '../../../../../hooks/redux'
import useViewportDimensions from '../../../../../hooks/useViewportDimensions'

import { abbreviateNumber } from '../../../../../utils/abbreviateNumber'
import { Coordinate, TimeFilter } from '../../../../../helpers/types'

import './LineChart.css'

interface LineChartProps{
  plotData: Coordinate[]
  plotName?: string
  size?: {
    width: number | string
    height: number | string
  }
  color: string | undefined
  yLabel: string
  timeFilter: TimeFilter
  customOptions?: ApexOptions
}

const LineChart = ({ plotData, plotName, size, color, yLabel, timeFilter, customOptions } : LineChartProps) => {
  const isDarkTheme = useAppSelector(state => state.colorThemeReducer.isDarkTheme)
  const {width,} = useViewportDimensions()

  const defaultOptions: ApexOptions = {
    chart: {
      id: plotName ? plotName : '',
      toolbar: {
        show: true,
      },
      offsetX: width >= 500 ? 0 : -17
    },
    colors: [color],
    dataLabels: {
      enabled: false,
    },
    fill: {
      type: "gradient",
      gradient: {
        type: 'vertical',
        shadeIntensity: 0,
        opacityFrom: 0.6,
        opacityTo: 0.15,
        stops: [0, 100],
        inverseColors: true,
      }
    },
    grid: {
      borderColor: isDarkTheme ? '#5a5a5a' : '#c1c1c1'
    },
    stroke:{
      width: 2,
      colors: [color as string],
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
          return width >= 750 ? 
            timeFilter === '1d' ? value?.split(', ')[1] : value : 
            timeFilter === '1d' ? 
              value.toString().split(', ')[1] : value.toString().split(', ')[0]
        },
        showDuplicates: false,
        hideOverlappingLabels: true,
        style: {
          colors: plotData.map(coord => isDarkTheme ? '#636363' : '#000000')
        }
      },
      crosshairs:{
        stroke: {
          dashArray: 0,
          color: isDarkTheme ? '#777777ff' : '#00000018'
        }
      },
      categories: plotData.map(coord => coord.x),
      tickAmount: width >= 750 ? parseInt(timeFilter.slice(0, 1)) : 2,
      tickPlacement: 'between',
      axisTicks: {
        borderType: 'solid',
        show: false,
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
          return "$" + abbreviateNumber(value, 2)
        },
        offsetY: 3,
        style: {
          colors: plotData.map(coord => isDarkTheme ? '#636363' : '#000000')
        },
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
      width={size ? size.width : '100%'}
      height={size ? size.height : 'auto'}
      options={customOptions ? {...defaultOptions, ...customOptions} : defaultOptions}
      series={series}
      type='area'
    />
  )
}

export default LineChart

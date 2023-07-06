import Chart from 'react-apexcharts'
import { ApexOptions } from 'apexcharts'

import { abbreviateNumber } from '../../../../../utils/abbreviateNumber'
import { Coordinate, TimeFilter } from '../../../../../helpers/types'

import './LineChart.css'
import { useAppSelector } from '../../../../../hooks/redux'

interface LineChartProps{
  plotData: Coordinate[]
  plotName: string
  color: string | undefined
  yLabel: string
  timeFilter: TimeFilter
}

const LineChart = ({ plotData, plotName, color, yLabel, timeFilter } : LineChartProps) => {
  const isDarkTheme = useAppSelector(state => state.colorThemeReducer.isDarkTheme)

  const options: ApexOptions = {
    chart: {
      id: plotName,
      toolbar: {
        show: true,
      },
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
          return timeFilter === '1d' ? value?.split(', ')[1] : value
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
      tickAmount: parseInt(timeFilter.slice(0, 1)),
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
      options={options}
      series={series}
      type='area'
    />
  )
}

export default LineChart
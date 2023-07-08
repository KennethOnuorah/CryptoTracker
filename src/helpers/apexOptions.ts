import { ApexOptions } from "apexcharts";

export const entry7dSparklineOptions: ApexOptions = {
  grid: {
    show: false,
  },
  chart: {
    toolbar: {
      show: false
    }
  },
  xaxis: {
    labels: {
      show: false
    },
    axisTicks: {
      show: false
    },
    axisBorder: {
      show: false
    },
    tickAmount: 0
  },
  yaxis: {
    labels: {
      show: false
    },
  },
  fill: {
    type: 'solid',
    opacity: 0
  },
  stroke: {
    width: 1
  },
  tooltip: {
    enabled: false
  }
}
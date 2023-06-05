import CurrencyTable from "./CurrencyTable/CurrencyTable"

import "./Chart.css"

interface ChartProps{
  title: string,
  subtitle?: string,
  icon: JSX.Element,
}

const Chart = ({ title, subtitle, icon } : ChartProps) => {
  return (
    <section className='chart'>
      <div className="heading">
        <title className='title'>
          {title}
          {icon}
        </title>
        <div className="subtitle">
          {subtitle}
        </div>
      </div>
      <CurrencyTable 
        fields={["#", "Name", "Price", "24h %", "Market Cap", "7d Chart"]}
      />
    </section>
  )
}

export default Chart

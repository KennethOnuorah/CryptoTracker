import Entry from "./Entry/Entry"
import "./CurrencyTable.css"

interface CurrencyTableProps{
  fields: string[],
}

const CurrencyTable = ({ fields } : CurrencyTableProps) => {
  return (
    <table className="currencyTable">
      <thead className="fields">
        {fields.map((f) => <th className={`${f}`}>{f}</th>)}
      </thead>
      <tbody>
        <Entry
          index={1}
          logoSrc="/images/placeholder_token_logo.png"
          name="Bitcoin"
          abbreviation="BTC"
          price={26883.29}
          dayChange="+4.26%"
          marketCap={521.34}
        />
        <Entry
          index={1}
          logoSrc="/images/placeholder_token_logo.png"
          name="Bitcoin"
          abbreviation="BTC"
          price={26883.29}
          dayChange="+4.26%"
          marketCap={521.34}
        />
        <Entry
          index={1}
          logoSrc="/images/placeholder_token_logo.png"
          name="Bitcoin"
          abbreviation="BTC"
          price={26883.29}
          dayChange="+4.26%"
          marketCap={521.34}
        />
        <Entry
          index={1}
          logoSrc="/images/placeholder_token_logo.png"
          name="Bitcoin"
          abbreviation="BTC"
          price={26883.29}
          dayChange="+4.26%"
          marketCap={521.34}
        />
        <Entry
          index={1}
          logoSrc="/images/placeholder_token_logo.png"
          name="Bitcoin"
          abbreviation="BTC"
          price={26883.29}
          dayChange="+4.26%"
          marketCap={521.34}
        />      
      </tbody>
    </table>
  )
} 

export default CurrencyTable

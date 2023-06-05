import "./CurrencyTable.css"

interface CurrencyTableProps{
  fields: string[],
  apiLink?: string,
}
/**
 * A table that displays a list of cryptocurrency information from an API
*/
const CurrencyTable = ({ fields } : CurrencyTableProps) => {
  return (
    <table className="currencyTable">
      <tr>
        {fields.map((f) => <th>{f}</th>)}
      </tr>
      <tbody>
        {/* Should be its own component (maybe) */}
        <tr className="tableEntry">
          <th>1</th>
          <th>Bitcoin</th>
          <th>$3.00</th>
          <th>-0.31%</th>
          <th>$525.31B</th>
          <th>*Chart goes here*</th>
        </tr>
      </tbody>
    </table>
  )
} 

export default CurrencyTable

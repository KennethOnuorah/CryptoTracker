import "./CurrencyTable.css"

interface CurrencyTableProps{
  fields: string[],
  removableFields?: string[]
}

const CurrencyTable = ({ fields } : CurrencyTableProps) => {
  return (
    <table className="currencyTable">
      <tr>
        {fields.map((f) => <th>{f}</th>)}
      </tr>
      <tbody>
      </tbody>
    </table>
  )
}

export default CurrencyTable

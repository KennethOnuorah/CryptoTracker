import "./Entry.css"

interface EntryProps{
  index: number,
  logoSrc: string,
  name: string,
  abbreviation: string,
  price: number,
  dayChange: number | string,
  marketCap: number,
}

const Entry = ({ 
  index,
  logoSrc,
  name,
  abbreviation,
  price,
  dayChange,
  marketCap
 } : EntryProps) => {
  return (
    <tr className="tableEntry">
      <th className="index">{index}</th>
      <th className="name">
        <a href="#">
          <div className="group">
            <img src={logoSrc} height={"25px"}/>
            <div className="nameDisplay">
              {name}
              <br/>
              <div className="abbreviation">
                {abbreviation}
              </div>
            </div>
          </div>
        </a>
      </th>
      <th className="price">${price.toLocaleString()}</th>
      <th className="24hChange">{dayChange}</th>
      <th className="marketCap">${marketCap} B</th>
      <th className="weekChart">[No Charts Yet]</th>
    </tr>
  )
}

export default Entry

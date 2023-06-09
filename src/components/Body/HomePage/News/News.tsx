import Article from "./Article/Article"
import { useAppSelector } from "../../../../hooks/redux"

import "./News.css"

interface NewsProps{
  title: string,
  subtitle?: string,
  icon: JSX.Element,
}

const News = ({ title, subtitle, icon } : NewsProps) => {
  const isDarkTheme = useAppSelector(state => state.colorThemeReducer.isDarkTheme)

  return (
    <section className="news">
      <div className="heading">
        <title 
          className='title'
          style={{
            color: isDarkTheme ? 'white' : 'black'
          }}
        > 
          {title}
          {icon}
        </title>
        <div className="subtitle">
          {subtitle}
        </div>
      </div>
      <div className="articles">
        <Article/>
        <Article/>
        <Article/>
        <Article/>
        <Article/>
        <Article/>
      </div>
    </section>
  )
}

export default News

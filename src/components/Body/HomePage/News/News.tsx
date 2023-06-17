import Article from "./Article/Article"
import { NewsData, NewsArticle } from "../../../../helpers/types"
import { useAppSelector } from "../../../../hooks/redux"

import "./News.css"

interface NewsProps{
  title: string,
  subtitle?: string,
  icon: JSX.Element,
  data: NewsData
}

const News = ({ title, subtitle, icon, data } : NewsProps) => {
  const isDarkTheme = useAppSelector(state => state.colorThemeReducer.isDarkTheme)
  const articles: NewsArticle[] = data.articles.slice(0, 6)

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
        {articles.map((article, index) => 
          <Article
            key={index}
            headline={article.title}
            description={article.description}
            link={article.url}
            siteName={article.source.name}
          />
        )}
      </div>
    </section>
  )
}

export default News

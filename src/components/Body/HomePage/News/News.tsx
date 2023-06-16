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
  const articles: NewsArticle[] = data.results.slice(0, 6)

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
            imageSrc={article.image_url}
            link={article.link}
            site={article.source_id}
          />
        )}
      </div>
    </section>
  )
}

export default News

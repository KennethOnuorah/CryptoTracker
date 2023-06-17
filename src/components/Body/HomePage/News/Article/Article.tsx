import { useAppSelector } from '../../../../../hooks/redux'
import { HiOutlineExternalLink as ReadIcon } from 'react-icons/hi'

import "./Article.css"

interface ArticleProps{
  headline: string,
  description: string,
  link: string, 
  siteName: string,
}

const Article = ({ headline, description, link, siteName } : ArticleProps) => {
  const isDarkTheme = useAppSelector(state => state.colorThemeReducer.isDarkTheme)

  return (
    <article className={`article${isDarkTheme ? ' darkArticle' : ''}`}>
      <div className="top">
        <div className="text">
          <div className={`headline${isDarkTheme ? ' darkHeadline' : ''}`}>
            {headline}
          </div>
          {
          description && 
            <div className="description">
              {(description.split('. ')[0] + '.').replace('..', '.')}
            </div>
          }
        </div>
      </div>
      <div className="bottom">
        <a 
          href={link} 
          target='_blank' 
          rel='noopener noreferrer'
        >
          Read more on {siteName}
          <div>
            <ReadIcon size={15}/>
          </div>
        </a>
      </div>
    </article>
  )
}

export default Article

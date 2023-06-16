import { useAppSelector } from '../../../../../hooks/redux'
import { HiOutlineExternalLink as ReadIcon } from 'react-icons/hi'

import "./Article.css"

interface ArticleProps{
  headline: string,
  description: string,
  imageSrc: string,
  link: string, 
  site: string,
}

const Article = ({ headline, description, imageSrc, link, site } : ArticleProps) => {
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
              {description.split(". ")[0] + '.'}
            </div>
          }
        </div>
        <img 
          className='articleThumbnail' 
          src={'/public/images/placeholder_article_image.png'}
          alt="Article image" 
          width={150} 
          height={150}
        />
      </div>
      <div className="bottom">
        <a 
          href={link} 
          target='_blank' 
          rel='noopener noreferrer'
        >
          Read more on {site.toUpperCase()}
          <div>
            <ReadIcon size={15}/>
          </div>
        </a>
      </div>
    </article>
  )
}

export default Article

import { HiOutlineExternalLink as ReadIcon } from 'react-icons/hi'

import "./Article.css"

const Article = () => {
  return (
    <article className='article'>
      <div className="top">
        <div className="text">
          <div className="headline">
            Breaking News: This Is A Headline
          </div>
          <div className="description">
            Bitcoin prices going up, Dogecoin suffers all-time low, more boring bullsh*t...
          </div>
        </div>
        <img src="/images/placeholder_article_image.png" alt="Article image" width={150} height={150}/>
      </div>
      <div className="bottom">
        <a 
          href='#' 
          target='_blank' 
          rel='noopener noreferrer'
        >
          Read more on Yahoo Finance
          <div>
            <ReadIcon size={15}/>
          </div>
        </a>
      </div>
    </article>
  )
}

export default Article

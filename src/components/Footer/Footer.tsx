import "./Footer.css"

const Footer = () => {
  const currentYear: number = new Date().getFullYear()

  return (
    <footer className='footer'>
      <div className="name">
        Kenneth Onuorah
      </div>
      <div className="copyright">
        Copyright © {currentYear}
      </div>
    </footer>
  )
}

export default Footer

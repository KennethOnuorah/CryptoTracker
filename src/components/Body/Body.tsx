import { Route, Routes } from "react-router-dom"

import HomePage from "./HomePage/HomePage"
import TokenPage from "./TokenPage/TokenPage"

import "./Body.css"

const Body = () => {
  return (
    <main className="body">
      <Routes>
        <Route path="/" element={<HomePage/>}/>
        <Route path="/:name" element={<TokenPage/>}/>
      </Routes>
    </main>
  )
}

export default Body

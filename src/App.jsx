import React from "react"
import { BrowserRouter,Routes,Route } from "react-router-dom"
import Navbar from "./components/Navbar"
import HomePage from "./pages/HomePage"
import TopRatedPage from "./pages/TopRatedPage"
import UpcomingPage from "./pages/UpcomingPage"
import MovieDetailPage from './pages/MovieDetailPage';
import SearchResultsPage from './components/SearchResultsPage'

function App() {

  return (
    <BrowserRouter>
      <Navbar/>
      <Routes>
        <Route path="/" element={<HomePage/>}></Route>
        <Route path="/search" element={<SearchResultsPage />} />
        <Route path="/top-rated" element={<TopRatedPage/>}></Route>
        <Route path="/upcoming" element={<UpcomingPage/>}></Route>
        <Route path="/movie/:id" element={<MovieDetailPage/>}></Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App

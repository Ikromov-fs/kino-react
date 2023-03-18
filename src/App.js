import React from 'react'
import '../src/assets/main.css'
import Header from './companents/header/header'
import { Route, Routes } from 'react-router-dom'
import Popular from './pages/popular/popular'
import TopRated from './pages/topRated/topRated';
import Home from './pages/home/home';
import Singl from './companents/singl/singl'
const App = () => {
  return (
    <div className='bg-color' >
      <Header />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/poplya' element={<Popular />} />
        <Route path='/topRated' element={<TopRated />} />
        <Route path='/singl/:id' element={<Singl />} />
      </Routes>
    </div>
  )
}

export default App
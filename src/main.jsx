import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import Header from './components/Header'

//импорт того самого компонента
import HomePage from './pages/HomePage/HomePage'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Footer from './components/Footer'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Header />

      {/*между browserrouter и routes поместить шапку и подвал, то есть их не нужно добавлять в каждый компонент отдельно */}
      <Routes>
        {/*здесь создаем маршруты вроде все ок */}
        <Route path='/' element={<HomePage />} />



        {/*тут будет страница с неправельным маршрутом то есть когда 404 то будет выходить она */}
        <Route path='*' element={<></>} />
      </Routes>

      <Footer />
    </BrowserRouter>
  </StrictMode>,
)

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Provider } from 'react-redux'
import { combineReducers } from 'redux'
import { configureStore } from '@reduxjs/toolkit'
import './index.css'

//импорт страниц
import HomePage from './pages/HomePage/HomePage'
import Footer from './components/Footer'
import AuthPage from './pages/AuthPage/AuthPage'
import Header from './components/Header'

//импорт редусеров
import { authReducer } from './pages/AuthPage/AuthSlice'
import StagesPage from './pages/StagesPage/StagesPage'
import StagePage from './pages/StagePage/StagePage'
import { stagesReducer } from './pages/StagesPage/StagesSlice'
import ScrollToTop, { SetBG } from './hooks'

const rootReducer = combineReducers({
  auth: authReducer,
  stages: stagesReducer,
})

const store = configureStore({
  reducer: rootReducer,
})

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <ScrollToTop />
        <SetBG />
        <Header />

        <Routes>
          {/*здесь создаем маршруты вроде все ок */}
          <Route path='/' element={<HomePage />} />
          <Route path='/auth' element={<AuthPage />} />
          <Route path='/stages' element={<StagesPage />} />
          <Route path='/stages/:id' element={<StagePage />} />



          {/*тут будет страница с неправельным маршрутом то есть когда 404 то будет выходить она */}
          <Route path='*' element={<></>} />
        </Routes>

        <Footer />
      </Provider>
    </BrowserRouter>
  </StrictMode>,
)

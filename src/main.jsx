import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Provider } from 'react-redux'
import { combineReducers } from 'redux'
import { configureStore } from '@reduxjs/toolkit'
import './index.css'

//импорт страниц
import HomePage from './pages/HomePage/HomePage'
import AuthPage from './pages/AuthPage/AuthPage'
import FinishPage from './pages/FinishPage/FinishPage'
import SignUpPage from './pages/SignUpPage/SignUpPage'
import StagesPage from './pages/StagesPage/StagesPage'
import StagePage from './pages/StagePage/StagePage'

//импорт редусеров
import { authReducer } from './pages/AuthPage/AuthSlice'
import { stagesReducer } from './pages/StagesPage/StagesSlice'
import { signUpReducer } from './pages/SignUpPage/SignUpSlice'

//другое
import Footer from './components/Footer'
import Header from './components/Header'
import ScrollToTop, { SetBG } from './hooks'


const rootReducer = combineReducers({
  auth: authReducer,
  signup: signUpReducer,
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
          <Route path='/signup' element={<SignUpPage />} />
          <Route path='/stages' element={<StagesPage />} />
          <Route path='/stages/:id' element={<StagePage />} />
          <Route path='/finish' element={<FinishPage />} />

          {/*тут будет страница с неправельным маршрутом то есть когда 404 то будет выходить она */}
          <Route path='*' element={<></>} />
        </Routes>

        <Footer />
      </Provider>
    </BrowserRouter>
  </StrictMode>,
)

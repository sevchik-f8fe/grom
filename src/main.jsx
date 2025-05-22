import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Provider } from 'react-redux'
import sessionStorage from 'redux-persist/lib/storage/session'
import { persistStore, persistReducer } from 'redux-persist'
import { configureStore } from '@reduxjs/toolkit'

//импорт страниц
import HomePage from './pages/HomePage/HomePage'
import AuthPage from './pages/AuthPage/AuthPage'
import FinishPage from './pages/FinishPage/FinishPage'
import SignUpPage from './pages/SignUpPage/SignUpPage'
import StagesPage from './pages/StagesPage/StagesPage'
import StagePage from './pages/StagePage/StagePage'
import AdminPage from './pages/AdminPage/AdminPage'

//импорт редусеров
import { authReducer } from './pages/AuthPage/AuthSlice'
import { stagesReducer } from './pages/StagesPage/StagesSlice'
import { signUpReducer } from './pages/SignUpPage/SignUpSlice'
import { globalReducer } from './globalSlice'

//другое
import Footer from './components/Footer'
import Header from './components/Header'
import { SetBG, UseGeo, ScrollToTop, UseWebSocket } from './hooks'
import './index.css'
import { PersistGate } from 'redux-persist/integration/react'
import { adminReducer } from './pages/AdminPage/AdminSlice'

const persistConfig = {
  key: 'team',
  version: 1,
  storage: sessionStorage,
};

const persistedReducer = persistReducer(persistConfig, globalReducer);

const store = configureStore({
  reducer: {
    global: persistedReducer,
    auth: authReducer,
    signup: signUpReducer,
    stages: stagesReducer,
    admin: adminReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export const persistor = persistStore(store);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <PersistGate persistor={persistor} loading={null}>
          <ScrollToTop />
          <SetBG />
          <UseWebSocket />
          {/* <UseGeo /> */}
          <Header />

          <Routes>
            {/*здесь создаем маршруты вроде все ок */}
            <Route path='/' element={<HomePage />} />
            <Route path='/auth' element={<AuthPage />} />
            <Route path='/signup' element={<SignUpPage />} />
            <Route path='/stages' element={<StagesPage />} />
            <Route path='/stages/:id' element={<StagePage />} />
            <Route path='/finish' element={<FinishPage />} />
            <Route path='/admin' element={<AdminPage />} />

            {/*тут будет страница с неправельным маршрутом то есть когда 404 то будет выходить она */}
            <Route path='*' element={<></>} />
          </Routes>

          <Footer />
        </PersistGate>
      </Provider>
    </BrowserRouter>
  </StrictMode>,
)

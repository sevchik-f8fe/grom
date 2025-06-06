/* eslint-disable react-refresh/only-export-components */
import { StrictMode, useEffect, useState } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Provider } from "react-redux";
import sessionStorage from "redux-persist/lib/storage/session";
import { persistStore, persistReducer } from "redux-persist";
import { configureStore } from "@reduxjs/toolkit";

//импорт страниц
import HomePage from "./pages/HomePage/HomePage";
import AuthPage from "./pages/AuthPage/AuthPage";
import FinishPage from "./pages/FinishPage/FinishPage";
import SignUpPage from "./pages/SignUpPage/SignUpPage";
import StagesPage from "./pages/StagesPage/StagesPage";
import StagePage from "./pages/StagePage/StagePage";
import AdminPage from "./pages/AdminPage/AdminPage";
import QRPage from "./pages/QRPage/QRPage";
import ErrorPage from "./pages/ErrorPage";

//импорт редусеров
import { authReducer } from "./pages/AuthPage/AuthSlice";
import { stagesReducer } from "./pages/StagesPage/StagesSlice";
import { signUpReducer } from "./pages/SignUpPage/SignUpSlice";
import { globalReducer } from "./globalSlice";
import { QRReducer } from "./pages/QRPage/QRSlice";

//другое
import Footer from "./components/Footer";
import Header from "./components/Header";
import QuestStateLoader from "./components/QuestStateLoader";
import { SetBG, UseGeo, ScrollToTop, UseWebSocket } from "./hooks";
import "./index.css";
import { PersistGate } from "redux-persist/integration/react";
import { adminReducer } from "./pages/AdminPage/AdminSlice";

const persistConfig = {
  key: "team",
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
    qr: QRReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export const persistor = persistStore(store);

const ProjRoutes = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 520);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 520);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <Routes>
      <Route path="/admin" element={<AdminPage />} />
      <Route path="/" element={<HomePage />} />
      <Route
        path="*"
        element={
          isMobile ? (
            <>
              <Routes>
                {/*здесь создаем маршруты вроде все ок */}
                <Route path="/auth" element={<AuthPage />} />
                <Route path="/signup" element={<SignUpPage />} />
                <Route path="/stages" element={<StagesPage />} />
                <Route path="/stages/:id" element={<StagePage />} />
                <Route path="/stages/:id/qr-scanner" element={<QRPage />} />
                <Route path="/finish" element={<FinishPage />} />
                <Route path="/error" element={<ErrorPage />} />
                <Route path="*" element={<></>} />
              </Routes>
            </>
          ) : (
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "95vh",
                fontSize: "24px",
                fontWeight: "bold",
                color: "white",
                textAlign: "center",
              }}
            >
              Страница открывается только на мобильных устройствах
            </div>
          )
        }
      />
    </Routes>
  );
};

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <PersistGate persistor={persistor} loading={null}>
          <QuestStateLoader />
          <ScrollToTop />
          <SetBG />
          <UseWebSocket />
          <Header />
          <ProjRoutes />
          <Footer />
        </PersistGate>
      </Provider>
    </BrowserRouter>
  </StrictMode>
);

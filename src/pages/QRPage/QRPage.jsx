// Импорт разных объектов и зависимостей
import { useState, useRef, useEffect } from "react";
import QrScanner from "qr-scanner";
import { useDispatch } from "react-redux";
import { setQrCode } from "./QRSlice";

// Функция, вызывающая приложение
const QRPage = () => {
  // Определение переменных, хранящих состояние
  const [scanResult, setScanResult] = useState("");
  const videoRef = useRef(null);
  const qrScannerRef = useRef(null);
  const dispatch = useDispatch();
  const scanDelay = 1000;

  // TODO: добавить задержку сканирования или невозможность сканирования одних и тех же QR-кодов (или когда код сканируется в уже завершеный этап)

  // Механизм сканирования
  useEffect(() => {
    let lastScanTime = 0;

    const qrScanner = new QrScanner(
      videoRef.current,
      (result) => {
        const now = Date.now();
        if (now - lastScanTime >= scanDelay) {
          // Запись полученных данных
          const qrData = result.data;
          setScanResult(qrData);
          console.log("QR code detected:", qrData);
          dispatch(setQrCode(qrData));
          lastScanTime = now;
        }
      },
      {
        highlightCodeOutline: true,
      }
    );

    qrScannerRef.current = qrScanner;

    // Выявление ошибок при запуске камеры
    qrScanner.start().catch((error) => {
      console.error("Failed to start QR scanner", error);
    });

    return () => {
      qrScanner.destroy();
    };
  }, [dispatch]);

  // HTML-структура страницы-приложения
  return (
    <div className="qr-page-container">
      <div className="message-for-user">
        <p>Наведите камеру на QR-код</p>
      </div>
      <div className="qr-box">
        <img src="/src/assets/img/qr.svg" className="qr-cover" />
        <video ref={videoRef} className="qr-page-video" />
      </div>
      <p>
        Данные: <br /> {scanResult}
      </p>
    </div>
  );
};

export default QRPage;

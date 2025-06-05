import { useState, useRef, useEffect } from "react";
import QrScanner from "qr-scanner";
import { useDispatch } from "react-redux";
import { setQrCode } from "./QRSlice";

const QRPage = () => {
  const [scanResult, setScanResult] = useState("");
  const [showPopup, setShowPopup] = useState(false);
  const [urlToOpen, setUrlToOpen] = useState("");
  const videoRef = useRef(null);
  const qrScannerRef = useRef(null);
  const dispatch = useDispatch();

  const scanDelay = 1000; // Задержка в 1 секунду

  // Регулярное выражение для проверки, является ли строка ссылкой целиком (http(s):// или www.)
  const isOnlyUrl = (text) => {
    const urlRegex = /^(https?:\/\/|www\.)[^\s/$.?#].[^\s]*$/i;
    return urlRegex.test(text.trim());
  };

  // Функция для превращения ссылок внутри текста в кликабельные <a>
  const linkifyText = (text) => {
    if (!text) return null;
    // Регулярка поиска ссылок в тексте
    const urlPattern = /(\bhttps?:\/\/[^\s]+|\bwww\.[^\s]+)/gi;

    // Разбиваем по ссылкам и формируем JSX с кликабельными ссылками
    const parts = text.split(urlPattern);

    return parts.map((part, i) => {
      if (urlPattern.test(part)) {
        const href = part.startsWith("http") ? part : `https://${part}`;
        return (
          <a
            key={i}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="underline text-blue-600 hover:text-blue-800"
          >
            {part}
          </a>
        );
      }
      return part;
    });
  };

  useEffect(() => {
  let lastScanTime = 0;
  const qrScanner = new QrScanner(
    videoRef.current,
    (result) => {
      if (showPopup) return;

      const now = Date.now();
      if (now - lastScanTime >= scanDelay) {
        const qrData = result.data.trim();

        setScanResult(qrData);
        dispatch(setQrCode(qrData));

        if (isOnlyUrl(qrData)) {
          setUrlToOpen(qrData.startsWith("http") ? qrData : `https://${qrData}`);
          setShowPopup(true);
          qrScanner.stop();
        }

        lastScanTime = now;
      }
    },
    {
      highlightCodeOutline: true,
    }
  );

  qrScannerRef.current = qrScanner;

  const handleVisibilityChange = () => {
    if (document.visibilityState === "visible") {
      if (!showPopup) {
        qrScanner.start().catch((error) => {
          console.error("Failed to start QR scanner", error);
        });
      }
      // Если поп-ап открыт - не запускать
    } else {
      qrScanner.stop();
    }
  };

  document.addEventListener("visibilitychange", handleVisibilityChange);

  // Стартуем сканер по умолчанию, если нет поп-апа
  if (!showPopup) {
    qrScanner.start().catch((error) => {
      console.error("Failed to start QR scanner", error);
    });
  }

  return () => {
    document.removeEventListener("visibilitychange", handleVisibilityChange);
    qrScanner.destroy();
  };
}, [dispatch, scanDelay, showPopup]);

  // Обработчик закрытия поп-апа — возобновляет сканирование
  const closePopup = () => {
    setShowPopup(false);
    setUrlToOpen("");
    qrScannerRef.current?.start();
  };

  return (
    <div className="qr-page-container">
      <div className="message-for-user">
        <p>Наведите камеру на QR-код</p>
      </div>

      <div>
        <img
          src="/src/assets/img/qr.svg"
          className="qr-cover"
          alt="QR code cover"
        />
        <video ref={videoRef} className="qr-page-video" />
      </div>

      <p>
        Данные: <br /> {linkifyText(scanResult)}
      </p>

      {/* Поп-ап при сканировании только ссылки */}
      {showPopup && (
        <div
          className="popup"
          role="dialog"
          aria-modal="true"
          aria-labelledby="popupTitle"
        >
          <div className="popupContent">
            <p id="popupTitle" className="popupText">
              Перейти по ссылке?
            </p>
            <a
              href={urlToOpen}
              target="_blank"
              rel="noopener noreferrer"
              className="popupLink"
            >
              {urlToOpen}
            </a>
            <button
              onClick={closePopup}
              className="popupButton"
              aria-label="Закрыть окно перехода по ссылке"
            >
              Закрыть
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default QRPage;
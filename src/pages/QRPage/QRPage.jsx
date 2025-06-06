import { useState, useRef, useEffect } from "react";
import QrScanner from "qr-scanner";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { setQrCode } from "./QRSlice";

const QRPage = () => {
  const [scanResult, setScanResult] = useState("");
  const [showPopup, setShowPopup] = useState(false);
  const [popupContent, setPopupContent] = useState({ message: "", link: null });
  const [isProcessing, setIsProcessing] = useState(false);

  const videoRef = useRef(null);
  const qrScannerRef = useRef(null);
  const dispatch = useDispatch();

  const { id: stageNumber } = useParams(); // Получаем номер этапа из URL
  const { token } = useSelector((state) => state.global); // Получаем токен для авторизации

  // Функция закрытия pop-up из вашего примера
  const closePopup = () => {
    setShowPopup(false);
    setPopupContent({ message: "", link: null });
    setIsProcessing(false);
    qrScannerRef.current
      ?.start()
      .catch((err) => console.error("Не удалось перезапустить сканер:", err));
  };

  useEffect(() => {
    const handleServerResponse = async (scannedData) => {
      // Теперь эта функция отвечает только за общение с сервером
      try {
        const response = await fetch(`/api/verify-qr/${stageNumber}`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ scannedData }),
        });

        const data = await response.json();
        setPopupContent({
          message: data.message || "Произошла ошибка при обработке.",
          link: data.success ? data.link : null,
        });
      } catch (error) {
        console.error("Ошибка при отправке данных QR-кода:", error);
        setPopupContent({
          message: "Не удалось подключиться к серверу.",
          link: null,
        });
      } finally {
        // Показываем pop-up в любом случае
        setShowPopup(true);
      }
    };

    if (videoRef.current) {
      const scanner = new QrScanner(
        videoRef.current,
        (result) => {
          // ШАГ 2: Блокируем повторное сканирование
          if (isProcessing || showPopup) {
            return;
          }

          if (result && result.data) {
            const qrData = result.data.trim();
            if (qrData) {
              setIsProcessing(true);
              qrScannerRef.current?.stop();

              setScanResult(qrData);
              dispatch(setQrCode(qrData));
              handleServerResponse(qrData);
            }
          }
        },
        {
          highlightCodeOutline: true,
          highlightScanRegion: true,
        }
      );

      qrScannerRef.current = scanner;

      const handleVisibilityChange = () => {
        // Эта логика предотвращает работу сканера в фоне
        if (
          document.visibilityState === "visible" &&
          !showPopup &&
          !isProcessing
        ) {
          qrScannerRef.current?.start();
        } else {
          qrScannerRef.current?.stop();
        }
      };

      document.addEventListener("visibilitychange", handleVisibilityChange);

      if (!showPopup && !isProcessing) {
        scanner
          .start()
          .catch((err) => console.error("Не удалось запустить QR сканер", err));
      }

      return () => {
        document.removeEventListener(
          "visibilitychange",
          handleVisibilityChange
        );
        qrScannerRef.current?.destroy();
      };
    }
  }, [dispatch, showPopup, stageNumber, token, isProcessing]);

  return (
    <div className="qr-page-container">
      <div className="message-for-user">
        <p>Наведите камеру на QR-код</p>
      </div>

      <div>
        {/* ШАГ 3: Возвращаем оверлей с исправлением */}
        <img
          src="/src/assets/img/qr.svg"
          className="qr-cover"
          alt="QR code cover"
          style={{ pointerEvents: "none" }}
        />
        <video ref={videoRef} className="qr-page-video" />
      </div>

      <p>
        Данные: <br /> {scanResult || "..."}
      </p>

      {showPopup && (
        <div
          className="popup"
          role="dialog"
          aria-modal="true"
          aria-labelledby="popupTitle"
        >
          <div className="popupContent">
            <p id="popupTitle" className="popupText">
              {popupContent.message}
            </p>
            {popupContent.link && (
              <a
                href={popupContent.link}
                target="_blank"
                rel="noopener noreferrer"
                className="popupLink"
              >
                Перейти по ссылке
              </a>
            )}
            <button
              onClick={closePopup}
              className="popupButton"
              aria-label="Закрыть окно"
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

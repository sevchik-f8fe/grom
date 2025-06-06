import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";

// Убедитесь, что здесь нет импортов типа `useDispatch` или `setActiveStage`,
// если они использовались для изменения номера этапа.

const StagePage = () => {
    const { startAt } = useSelector((state) => state.global);
    const params = useParams();
    const navigate = useNavigate();
    const now = new Date();

    // Эта функция должна делать ТОЛЬКО навигацию.
    const clickHandle = () => {
        navigate(`/stages/${params.id}/qr-scanner`);
        
        // УБЕДИТЕСЬ, ЧТО ЗДЕСЬ НЕТ НИКАКИХ ДРУГИХ КОМАНД,
        // ОСОБЕННО ТЕХ, ЧТО ВЫЗЫВАЮТ dispatch() ДЛЯ ИЗМЕНЕНИЯ ЭТАПА.
    };

    // --- Компонент таймера и его логика остаются без изменений ---
    const Timer = () => {
        const getTimeRemaining = (endtime) => {
            const total = Date.parse(endtime) - Date.parse(new Date());
            // ... остальная логика getTimeRemaining
            const seconds = Math.floor((total / 1000) % 60);
            const minutes = Math.floor((total / 1000 / 60) % 60);
            const hours = Math.floor((total / (1000 * 60 * 60)) % 24);
            const days = Math.floor(total / (1000 * 60 * 60 * 24));
            const totalHours = hours + days * 24;
            return { total, totalHours, minutes, seconds };
        };

        const [timeRemaining, setTimeRemaining] = useState(getTimeRemaining(startAt));

        useEffect(() => {
            const intervalId = setInterval(() => {
                setTimeRemaining(getTimeRemaining(startAt));
            }, 500);
            return () => clearInterval(intervalId);
        }, [startAt]);

        return (
            <span className="timer">
                {String(timeRemaining.totalHours).padStart(2, "0")}:
                {String(timeRemaining.minutes).padStart(2, "0")}:
                {String(timeRemaining.seconds).padStart(2, "0")}
            </span>
        );
    };

    return (
        <div className="stage-block-container">
            <div className="stage-header">
                <div className="stage-number">
                    <span>{params.id}</span>
                </div>
                <div className="stage-subheader">
                    <span className="stage-title">этап</span>
                    {startAt > now.toISOString() && (
                        <span className="stage-subtitle">начнется через:</span>
                    )}
                </div>
            </div>
            
            {/* Если квест еще не начался, показываем таймер */}
            {startAt > now.toISOString() ? <Timer /> : null}

            <button
                onClick={clickHandle}
                disabled={startAt > now.toISOString()}
                className="qr-btn"
            >
                ОТСКАНИРОВАТЬ QR-КОД
            </button>
        </div>
    );
};

export default StagePage;

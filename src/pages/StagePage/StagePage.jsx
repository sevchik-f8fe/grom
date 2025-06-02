import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { setActiveStage } from "../StagesPage/StagesSlice";
import { useEffect, useState } from "react";

const StagePage = () => {
    const { startAt } = useSelector(state => state.global)
    const dispatch = useDispatch();

    const params = useParams();
    const navigate = useNavigate();

    const clickHandle = () => {
        if (params.id != 10) {
            // Теперь при нажатии на кнопку открывается сканер QR-кодов
            navigate('/qr-scanner')

            // TODO: желательно это заменить на обработчик заданий или таймер
            dispatch(setActiveStage(Number(params.id) + 1)); 

        }
    }

    const now = new Date();

    return (
        <div className="stage-block-container">
            <div className="stage-header">
                <div className="stage-number"><span>{params.id}</span></div>
                <div className="stage-subheader">
                    <span className="stage-title">этап</span>
                    {startAt > now.toISOString() && <span className="stage-subtitle">начнется через:</span>}
                </div>
            </div>

            <Timer />

            <button onClick={clickHandle} disabled={startAt > now.toISOString()} className="qr-btn">ОТСКАНИРОВАТЬ QR-КОД</button>
        </div>
    );
}

const Timer = () => {
    const { startAt } = useSelector(state => state.global)
    const [timeRemaining, setTimeRemaining] = useState(getTimeRemaining(startAt));

    useEffect(() => {
        const intervalId = setInterval(() => {
            setTimeRemaining(getTimeRemaining(startAt));
        }, 500);

        return () => clearInterval(intervalId);
    }, [startAt]);

    function getTimeRemaining(endtime) {
        const total = Date.parse(endtime) - Date.parse(new Date());
        const seconds = Math.floor((total / 1000) % 60);
        const minutes = Math.floor((total / 1000 / 60) % 60);
        const hours = Math.floor((total / (1000 * 60 * 60)) % 24);
        const days = Math.floor(total / (1000 * 60 * 60 * 24));
        const totalHours = hours + (days * 24);

        return {
            total,
            hours,
            totalHours,
            minutes,
            seconds
        };
    }

    return (
        <span className="timer">{String(timeRemaining.totalHours).padStart(2, '0')}:{String(timeRemaining.minutes).padStart(2, '0')}:{String(timeRemaining.seconds).padStart(2, '0')}</span>
    )
}

export default StagePage;
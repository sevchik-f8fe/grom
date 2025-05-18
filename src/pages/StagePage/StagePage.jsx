import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { setActiveStage } from "../StagesPage/StagesSlice";

const StagePage = () => {
    const { stages, activeStageId } = useSelector((state) => state.stages)
    const dispatch = useDispatch();

    const params = useParams();
    const navigate = useNavigate();

    const clickHandle = () => {
        if (params.id != 10) {
            const currentId = stages.findIndex(stage => stage == activeStageId);
            console.log('need:', stages[currentId + 1])
            dispatch(setActiveStage(stages[currentId + 1]));

            navigate('/stages')
        }
    }

    return (
        <div className="stage-block-container">
            <div className="stage-header">
                <div className="stage-number"><span>{params.id}</span></div>
                <div className="stage-subheader">
                    <span className="stage-title">этап</span>
                    <span className="stage-subtitle">начнется через:</span>
                </div>
            </div>

            <Timer />

            <button onClick={clickHandle} className="qr-btn">ОТСКАНИРОВАТЬ QR-КОД</button>
        </div>
    );
}

const Timer = () => {
    return (
        <span className="timer">23:59:59</span>
    )
}

export default StagePage;
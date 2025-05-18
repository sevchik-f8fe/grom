import grayLine from "../../assets/img/lines/gray_line.svg"
import colorLine from "../../assets/img/lines/color_line.svg"
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { setActiveStage } from "./StagesSlice";

const StagesPage = () => {
    const { stages, activeStageId } = useSelector((state) => state.stages)
    const { user, token } = useSelector(state => state.global)
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        if (!token || token.length < 5) {
            navigate('/auth');
            return;
        }

        // dispatch(setActiveStage(user.currentPoint))
    }, [])

    const isStageCompleted = (stageId, activeStageId, stages) => {
        const activeIndex = stages.indexOf(activeStageId);
        const stageIndex = stages.indexOf(stageId);

        if (activeIndex === -1 || stageIndex === -1) {
            return false;
        }

        return stageIndex < activeIndex;
    };

    return (
        <div className="stages-container">
            {stages.map((stage, id, stages) => <StageElement number={id + 1} stages={stages} stage={stage} key={stage} active={activeStageId} completed={isStageCompleted(stage, activeStageId, stages)} />)}
        </div>
    );
}

const StageElement = ({ number, active, stage, stages, completed }) => {
    const navigate = useNavigate();

    const clickHandle = () => {
        if (stage === active) {
            navigate(`/stages/${number}`)
        }
        return;
    }

    return (
        <>
            {number % 2 !== 0 ? (
                // нечет
                <div className="stage-elem">
                    <div onClick={clickHandle} className={`stage-number-box ${(active === stages[number + 1]) || completed ? 'active-box' : ''}`}>
                        {number}
                    </div>
                    <img className="stage-line" src={(active === stages[number + 1]) || completed ? (colorLine) : (grayLine)} alt="" />
                </div>
            ) : (
                // чет
                <div className="stage-elem">
                    {number !== 10 ? <img className="stage-line" src={(active === stages[number + 1]) || completed ? (colorLine) : (grayLine)} alt="" /> : <div style={{ opacity: 0 }}>.</div>}
                    <div onClick={clickHandle} className={`stage-number-box ${(active === stages[number]) || completed ? 'active-box' : ''}`}>
                        {number}
                    </div>
                </div>
            )}
        </>
    )
}

export default StagesPage;
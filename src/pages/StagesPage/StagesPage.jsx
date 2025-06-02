import grayLine from "../../assets/img/lines/gray_line.svg"
import colorLine from "../../assets/img/lines/color_line.svg"
import { /*useDispatch,*/ useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
// import { useEffect } from "react";
// import { setActiveStage } from "./StagesSlice";

const StagesPage = () => {
    const { stages, activeStageId } = useSelector((state) => state.stages)
    // const { user, token, startAt } = useSelector(state => state.global)
    // const dispatch = useDispatch();
    // const navigate = useNavigate();

    // useEffect(() => {
    //     if (!token) {
    //         navigate('/auth');
    //         return;
    //     }

    //     dispatch(setActiveStage(user.currentPoint))
    // }, [])

    return (
        <div className="stages-container">
            {stages.map((stage) => <StageElement stage={stage} key={stage.point} active={activeStageId} completed={activeStageId > stage.id} />)}
        </div>
    );
}

const StageElement = ({ active, stage, completed }) => {
    const navigate = useNavigate();

    const clickHandle = () => {
        if (stage.id === active) {
            navigate(`/stages/${stage.id}`)
        }
        return;
    }

    return (
        <>
            {stage.id % 2 !== 0 ? (
                // нечет
                <div className="stage-elem">
                    <div onClick={clickHandle} className={`stage-number-box ${(active === stage.id + 1) || completed ? 'active-box' : ''}`}>
                        {stage.id}
                    </div>
                    <img className="stage-line" src={(active === stage.id + 1) || completed ? (colorLine) : (grayLine)} alt="" />
                </div>
            ) : (
                // чет
                <div className="stage-elem">
                    {stage.id !== 10 ? <img className="stage-line" src={(active === stage.id + 1) || completed ? (colorLine) : (grayLine)} alt="" /> : <div style={{ opacity: 0 }}>.</div>}
                    <div onClick={clickHandle} className={`stage-number-box ${(active === stage.id + 1) || completed ? 'active-box' : ''}`}>
                        {stage.id}
                    </div>
                </div>
            )}
        </>
    )
}

export default StagesPage;
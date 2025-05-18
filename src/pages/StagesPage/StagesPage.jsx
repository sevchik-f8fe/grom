import grayLine from "../../assets/img/lines/gray_line.svg"
import colorLine from "../../assets/img/lines/color_line.svg"
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const StagesPage = () => {
    const { stages, activeStageId } = useSelector((state) => state.stages)
    const { token } = useSelector(state => state.global)
    const dispatch = useDispatch();
    const navigate = useNavigate();

    // useEffect(() => {
    //     if (!token || token.length < 5) {
    //         navigate('/auth')
    //     }
    // }, [])

    return (
        <div className="stages-container">
            {stages.map((elem) => <StageElement number={elem.id} key={elem.id} active={activeStageId} completed={elem.completed} />)}
        </div>
    );
}

const StageElement = ({ number, active, completed }) => {
    const navigate = useNavigate();

    const clickHandle = () => {
        if (active === number) {
            navigate(`/stages/${active}`)
        }
        return;
    }

    return (
        <>
            {number % 2 !== 0 ? (
                // нечет
                <div className="stage-elem">
                    <div onClick={clickHandle} className={`stage-number-box ${(active === number + 1) || completed ? 'active-box' : ''}`}>
                        {number}
                    </div>
                    <img className="stage-line" src={(active === number + 1) || completed ? (colorLine) : (grayLine)} alt="" />
                </div>
            ) : (
                // чет
                <div className="stage-elem">
                    {number !== 10 ? <img className="stage-line" src={(active === number + 1) || completed ? (colorLine) : (grayLine)} alt="" /> : <div style={{ opacity: 0 }}>.</div>}
                    <div onClick={clickHandle} className={`stage-number-box ${(active === number + 1) || completed ? 'active-box' : ''}`}>
                        {number}
                    </div>
                </div>
            )}
        </>
    )
}

export default StagesPage;
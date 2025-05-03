import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { setActive, setStageCompleted } from "../StagesPage/StagesSlice";

const StagePage = () => {
    const { activeStageId } = useSelector((state) => state.stages)
    const dispatch = useDispatch();

    const params = useParams();
    const navigate = useNavigate();

    const clickHandle = () => {
        dispatch(setActive(activeStageId + 1));
        dispatch(setStageCompleted(activeStageId));

        navigate('/stages')
    }

    return (
        <div className="stage-block-container-finish">
            <div className="stage-header-finish">
                <div className="stage-number-mesto"><span>{1}</span></div>
                <div className="stage-subheader">
                    <span className="stage-title">МЕСТО</span>
                    <span className="stage-subtitle-finish">"Гомункулы"</span>
                    <span className="stage-subtitle-finish-light">команда победителей</span>
                </div>
            </div>


        </div>
    );
}



export default StagePage;
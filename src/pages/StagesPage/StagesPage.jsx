import { nanoid } from "nanoid";

import grayLine from "../../assets/img/lines/gray_line.svg"
import colorLine from "../../assets/img/lines/color_line.svg"

const StagesPage = () => {
    const stages = [
        { active: false, completed: true },
        { active: true, completed: false },
        { active: false, completed: false },
        { active: false, completed: false },
        { active: false, completed: false },
        { active: false, completed: false },
        { active: false, completed: false },
        { active: false, completed: false },
        { active: false, completed: false },
        { active: false, completed: false },
    ];

    return (
        <div className="stages-container">
            {stages.map((elem, id, arr) => <StageElement arr={arr} number={id} key={nanoid()} active={elem.active} completed={elem.completed} />)}
        </div>
    );
}

const StageElement = ({ number, active, completed, arr }) => {
    return (
        <>
            {number % 2 == 0 ? (
                // нечет
                <div className="stage-elem">
                    <div className={`stage-number-box ${active || completed ? 'active-box' : ''}`}>
                        {number + 1}
                    </div>
                    <img className="stage-line" src={(arr[number + 1]?.active || completed) ? (colorLine) : (grayLine)} alt="" />
                </div>
            ) : (
                // чет
                <div className="stage-elem">
                    {number !== 9 ? <img className="stage-line" src={(arr[number + 1]?.active || completed) ? (colorLine) : (grayLine)} alt="" /> : <div style={{ opacity: 0 }}>.</div>}
                    <div className={`stage-number-box ${active || completed ? 'active-box' : ''}`}>
                        {number + 1}
                    </div>
                </div>
            )}
        </>
    )
}

export default StagesPage;
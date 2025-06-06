import grayLine from "../../assets/img/lines/gray_line.svg"
import colorLine from "../../assets/img/lines/color_line.svg"
import { /*useDispatch,*/ useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
// import { useEffect } from "react";
// import { setActiveStage } from "./StagesSlice";

const StagesPage = () => {
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
    // 1. Получаем "правду" о текущем этапе из глобального состояния (global slice).
    // Мы больше не используем локальное состояние из `stages` slice.
    const { currentStage } = useSelector((state) => state.global);
    
    // Получаем статический список всех этапов. Убедитесь, что он у вас есть в `state.stages`.
    // Обычно это массив типа [{id: 1, ...}, {id: 2, ...}, ...]
    const { stages } = useSelector((state) => state.stages);

    return (
        <div className="stages-container">
            {stages.map((stage) => {
                // 2. Для каждого этапа в цикле определяем его статус на основе "правды" с сервера.
                const isCompleted = stage.id < currentStage;
                const isCurrent = stage.id === currentStage;

                // 3. Передаем эти флаги в дочерний компонент.
                return (
                    <StageElement 
                        stage={stage} 
                        key={stage.id} // Лучше использовать stage.id как ключ, если он уникален
                        isCompleted={isCompleted} 
                        isCurrent={isCurrent} 
                    />
                );
            })}
        </div>
    );
}

const StageElement = ({ stage, isCompleted, isCurrent }) => {
    const navigate = useNavigate();

    const clickHandle = () => {
        if (isCurrent) {
            navigate(`/stages/${stage.id}`);
        }
    };

    const boxClassName = isCompleted || isCurrent ? 'active-box' : '';
    const lineSrc = isCompleted ? colorLine : grayLine;

    return (
        <div className="stage-elem">
            {stage.id % 2 !== 0 ? (
                // НЕЧЕТНЫЙ ЭТАП: [КОРОБКА] [ЛИНИЯ]
                <>
                    <div onClick={clickHandle} className={`stage-number-box ${boxClassName}`}>
                        {stage.id}
                    </div>
                    <img className="stage-line" src={lineSrc} alt="" />
                </>
            ) : (
                // ЧЕТНЫЙ ЭТАП: [ЛИНИЯ ИЛИ ПУСТОТА] [КОРОБКА]
                <>
                    {/* 
                      Если это НЕ 10-й этап, мы рисуем линию.
                      Если это 10-й этап, мы рисуем пустой div.
                      Этот div будет служить "распоркой", чтобы justify-content
                      правильно оттолкнул коробку с номером вправо.
                    */}
                    {stage.id !== 10 ? (
                        <img className="stage-line" src={lineSrc} alt="" />
                    ) : (
                        <div /> 
                    )}
                    <div onClick={clickHandle} className={`stage-number-box ${boxClassName}`}>
                        {stage.id}
                    </div>
                </>
            )}
        </div>
    );
}

export default StagesPage;
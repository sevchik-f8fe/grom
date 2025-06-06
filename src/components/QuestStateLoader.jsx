import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setCurrentStage, setStartAt } from '../globalSlice'; // Проверьте правильность пути

// Этот компонент не будет ничего рисовать, он только выполняет логику
const QuestStateLoader = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        const fetchQuestState = async () => {
            try {
                // Делаем запрос к нашему новому API
                const response = await fetch('/api/quest/state');
                if (!response.ok) throw new Error('Network response was not ok');
                
                const data = await response.json();

                // Если данные получены, обновляем хранилище Redux
                if (data.currentStage) {
                    dispatch(setCurrentStage(data.currentStage));
                }
                if (data.startAt) {
                    dispatch(setStartAt(data.startAt));
                }
            } catch (error) {
                console.error("Не удалось загрузить актуальное состояние квеста:", error);
            }
        };

        fetchQuestState();
    }, [dispatch]); // Запускаем один раз при загрузке приложения

    return null; // Ничего не рендерим
};

export default QuestStateLoader;
import { useNavigate } from "react-router-dom";
import l from "../../assets/img/doctor2.png"
import a from "../../assets/img/full_logo.svg"
const HomePage = () => {

  const navigate = useNavigate();

  return (
    <div className="logodoctor">

      <div className="logo">
        <img src={a}></img>
      </div>

      <div className="doctor">
        <img src={l}></img>
        <h1>ГРОМ-КВЕСТ</h1>
        <div className="abzaz">
          <p>
            <span>Гром-Квест</span> – это OSINT-квест по Петербургу в стиле «Майора Грома». Команды студентов-инфобезников ищут метки, решают задания и соревнуются в анализе открытых данных прямо на городских улицах.
          </p>

          <p>
            Реальные локации, шифры и логические задачи – проверьте навыки расследования в динамичном формате. Побеждает команда, которая быстрее всех разгадает финальную загадку. <span>Включитесь в игру!</span>
          </p>
        </div>
      </div>

      <p className="buttomtext">
        стань детективом на улицах Петербурга и разгадай главную тайну вместе со своей командой!
      </p>

      <button className="buttonuch" onClick={() => navigate('/auth')}>
        ПРИНЯТЬ УЧАСТИЕ
      </button>

    </div>
  );
}

export default HomePage;
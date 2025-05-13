// здесь пишешь импорты
import { nanoid } from "nanoid";
//nanoid генерирует случайный ключ который нужен для реакта при рендере через перебор

// обязательно называй компоненты с большой буквы
const HomePage = () => {
   return (
    <div className="mobile-app">
      {/* <header className="header">
        <h1 className="header-title">ГЛАВНАЯ</h1>
      </header> */}

      <main className="main-content">
        <div className="logo-section">
          <div className="logo-main">ГРОМ-КВЕСТ</div>
          <div className="login-button">(войти)</div>
        </div>

        <div className="character-name">МАЙОР ГРОМ</div>
        <div className="quest-name">КВЕСТ</div>

        <div className="description-section">
          <p>
            ГРОМ-КВЕСТ — ЭТО ОДИН КВЕСТ ПО ПЕТЕРБУРГУ В СТАНЕ «МАЙОРА ГРОМА». КОМАНДЫ СТУДЕНТОВ-ИНФОРЕЗИРОВ ИЩУТ МЕТКИ. 
            РЕШАЮТ ЗАДАНИЯ И СОРЕВНИЧЕСТВ В АНАЛИЗЕ ОТКРЫТЫХ ДАННЫХ ПРЯМО НА ГОРОДСКИХ УЛИЦАХ.
          </p>
          
          <p>
            РЕАЛЬНЫЕ ЛОКАЦИИ ШИРPЫ И ΛΟΓΥΜΕΚΛΗΣ ЗАДАЧИ — ПРОВЕРЬТЕ НАВЫКИ РАССЛЕДОВАНИЯ И ФИНАМИЧНОМ ФОРМЕТЕ. 
            ПОБЕЖДАЕТ КОМАНДА, КОТОРАЯ БЫСТРЕЕ ВСЕХ РАЗГАДАЕТ ФИНАЛЬНУЮ ЗАГАДКУ, ВКЛЮЧИТЕСЬ В ИГРУ!
          </p>
          
          <p>
            СТАНЬ ДЕТЕКТИВОМ НА УЛИЦАХ ПЕТЕРБУРГА И РАЗГАДАЙ ГЛАВНУЮ ТАЙНУ ВМЕСТЕ СО СВОЕЙ КОМАНДОЙ!
          </p>
        </div>

        <button className="action-button">ПРИЯТЬ ЧУВСТВ</button>
      </main>
    </div>
  );
}

// для удобства можно создать новый компонент который будет доступен только в этом файле

// пропсы - то, что ты передаеш внутри круглых скобок

/*
можно писать так: 

const YourChildElement = (props) => {
    return (
        <p>{props.text}</p>
    )
}

можно так:
*/
const YourChildElement = ({ text }) => {
    return (
        <p>{text}</p>
    )
}

// для того чтобы сделать компонент с какимто содержимым, которое будет заполняться при его вызове, нужно передать пропс children
const BlockComponent = ({ children }) => {
    return (
        <div>{children}</div>
    )
}

//экспорт главного компонета чтобы потом получить его в main.jsx
export default HomePage;
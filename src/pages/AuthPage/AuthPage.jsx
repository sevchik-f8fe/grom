import Checkbox from "../../components/Checkbox";
import Input from "../../components/Input";

const AuthPage = () => {
    return (
        <div className="blur-container">
            <div className="auth-container">
                <h2 className="auth-title">АВТОРИЗАЦИЯ</h2>
                <Input label="Номер телефона:" id="tel" placeholder="+7 (123) 456-78-90" />
                <Input label="ФИО:" id="fio" placeholder="Иванов Иван Иванович" />
                <Checkbox label="Я СОГЛАСЕН С" link="ПОЛИТИКОЙ КОНФИДЕНЦИАЛЬНОСТИ" id="conf" />
                <Checkbox label="Я СОГЛАСЕН НА" link="ОБРАБОТКУ ПЕРСОНАЛЬНЫХ ДАННЫХ" id="pers" />

                {/*class disabled */}
                <div className="auth-footer">
                    <button className="auth-btn">ВОЙТИ</button>

                    <hr />

                    <span>ЕЩЁ НЕТ АККАУНТА?<br /><a href="">ЗАРЕГИСТРИРОВАТЬСЯ</a></span>
                </div>
            </div>
        </div>
    );
}

export default AuthPage;
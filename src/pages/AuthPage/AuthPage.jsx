import { useDispatch, useSelector } from "react-redux";
import Checkbox from "../../components/Checkbox";
import Input from "../../components/Input";
import { setConf, setFullName, setPers, setPhone } from "./AuthSlice";
import { useMask } from "@react-input/mask";

const AuthPage = () => {
    const { fullName, phone, confOk, persOk } = useSelector((state) => state.auth);
    const dispath = useDispatch();

    const inputRef = useMask({
        mask: '+7 (___) ___-__-__',
        replacement: { _: /\d/ },
    });

    const setCheckConfHandle = (e) => {
        dispath(setConf(e.target.checked))
    }

    const setCheckPersHandle = (e) => {
        dispath(setPers(e.target.checked))
    }

    const setPhoneHandle = (e) => {
        dispath(setPhone(e.target.value))
    }

    const setFullNameHandle = (e) => {
        dispath(setFullName(e.target.value.replace(/[0-9]/g, '').trimLeft()))
    }

    return (
        <div className="blur-container">
            <div className="auth-container">
                <h2 className="auth-title">АВТОРИЗАЦИЯ</h2>
                <Input ref={inputRef} value={phone} onChange={setPhoneHandle} label="Номер телефона:" id="tel" placeholder="+7 (123) 456-78-90" />
                <Input value={fullName} onChange={setFullNameHandle} label="ФИО:" id="fio" placeholder="Иванов Иван Иванович" />
                <Checkbox value={confOk} onChange={setCheckConfHandle} href='#' label="Я СОГЛАСЕН С" link="ПОЛИТИКОЙ КОНФИДЕНЦИАЛЬНОСТИ" id="conf" />
                <Checkbox value={persOk} onChange={setCheckPersHandle} href='#' label="Я СОГЛАСЕН НА" link="ОБРАБОТКУ ПЕРСОНАЛЬНЫХ ДАННЫХ" id="pers" />

                {/*class disabled */}
                <div className="auth-footer">
                    <button disabled={phone.length < 11 || fullName.trim().split(' ').length < 2 || !confOk || !persOk} className="auth-btn" >ВОЙТИ</button>

                    <hr />

                    <span>ЕЩЁ НЕТ АККАУНТА?<br /><a href="">ЗАРЕГИСТРИРОВАТЬСЯ</a></span>
                </div>
            </div>
        </div>
    );
}

export default AuthPage;
import { useDispatch, useSelector } from "react-redux";
import Input from "../../components/Input";
import { setPassword, setPhone } from "./AuthSlice";
import { setError, setToken, setUser, setIsAdmin } from "../../globalSlice";
import { useMask } from "@react-input/mask";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const AuthPage = () => {
    const { password, phone } = useSelector((state) => state.auth);
    const { error } = useSelector((state) => state.global);
    const dispath = useDispatch();
    const navigate = useNavigate();

    const inputRef = useMask({
        mask: '+7 (___) ___-__-__',
        replacement: { _: /\d/ },
    });

    const setPhoneHandle = (e) => {
        dispath(setPhone(e.target.value))
    }

    const setPasswordHandle = (e) => {
        dispath(setPassword(e.target.value.trim()))
    }

    const fetchFormData = async () => {
        await axios.post('http://127.0.0.1:3000/auth/signin',
            { phone, password },
            {
                headers: {
                    'Content-Type': 'application/json',
                }
            })
            .then((res) => res.data)
            .then((data) => {
                dispath(setUser(data?.team || data?.admin));
                dispath(setToken(data?.token));
                dispath(setIsAdmin(data?.isAdmin));
                dispath(setError(null))
                navigate('/')
            })
            .catch((err) => {
                // dispath(setError(err))
                console.log(err)
            })
    }

    const clickHandle = () => {
        fetchFormData();
    }

    return (
        <div className="auth-container">
            <h2 className="auth-title">АВТОРИЗАЦИЯ</h2>

            {error && (
                <div className="error-container">
                    <span>{error}</span>
                </div>
            )}

            <Input ref={inputRef} value={phone} onChange={setPhoneHandle} label="Номер телефона:" id="tel" placeholder="+7 (123) 456-78-90" />
            <Input type="password" value={password} onChange={setPasswordHandle} label="Пароль" id="pass" />

            <div className="auth-footer">
                <button onClick={clickHandle} disabled={phone.length < 18 || password.length < 5} className="auth-btn" >ВОЙТИ</button>
                <hr />
                <span>ЕЩЁ НЕТ АККАУНТА?<br /><a onClick={() => navigate('/signup')}>ЗАРЕГИСТРИРОВАТЬСЯ</a></span>
            </div>
        </div>
    );
}

export default AuthPage;
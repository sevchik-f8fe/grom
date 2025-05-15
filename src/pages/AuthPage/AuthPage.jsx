import { useDispatch, useSelector } from "react-redux";
import Input from "../../components/Input";
import { setAuthField, setAuthError } from "./AuthSlice";
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

    const fetchFormData = async () => {
        await axios.post('http://127.0.0.1:3000/auth/signin',
            { phone: phone.value.trim(), password: password.value.trim() },
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
                navigate('/stages')
            })
            .catch((err) => {
                dispath(setError(err.response.data.message))
                console.log(err)
            })
    }

    const clickHandle = () => {
        fetchFormData();
    }

    const setPhoneHandle = (e) => {
        dispath(setAuthField({ field: 'phone', value: e.target.value }))

        if (e.target.value.length < 18) {
            dispath(setAuthError({ field: 'phone', error: true }))
        } else {
            dispath(setAuthError({ field: 'phone', error: false }))
        }
    }

    const setPasswordHandle = (e) => {
        dispath(setAuthField({ field: 'password', value: e.target.value.replace(/[^a-zA-Z0-9_!?@#]/g, "").trim() }))

        if (e.target.value.length < 5) {
            dispath(setAuthError({ field: 'password', error: true }))
        } else {
            dispath(setAuthError({ field: 'password', error: false }))
        }
    }

    return (
        <div className="auth-container">
            <h2 className="auth-title">АВТОРИЗАЦИЯ</h2>

            {error && (
                <div className="error-container">
                    <span>{error}</span>
                </div>
            )}

            <Input ref={inputRef} error={phone.error} value={phone.value} onChange={setPhoneHandle} label="Номер телефона:" id="tel" placeholder="+7 (123) 456-78-90" />
            <Input type="password" error={password.error} value={password.value} onChange={setPasswordHandle} label="Пароль" id="pass" />

            <div className="auth-footer">
                <button onClick={clickHandle} disabled={phone.value.length < 18 || password.value.length < 5} className="auth-btn" >ВОЙТИ</button>
                <hr />
                <span>ЕЩЁ НЕТ АККАУНТА?<br /><a onClick={() => navigate('/signup')}>ЗАРЕГИСТРИРОВАТЬСЯ</a></span>
            </div>
        </div>
    );
}

export default AuthPage;
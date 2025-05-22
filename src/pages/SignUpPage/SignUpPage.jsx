import { useMask } from "@react-input/mask";

import Input from "../../components/Input";
import { useDispatch, useSelector } from "react-redux";
import { setCaptainError, setCaptainField, setCheck, setCurrentMember, setCurrentStep, setMemberError, setMemberField } from "./SignUpSlice";
import { useNavigate } from "react-router-dom";
import Checkbox from "../../components/Checkbox";
import expand from "../../assets/img/expand_icon.png"
import { useEffect, useState } from "react";
import axios from "axios";
import { setError, setToken, setUser, setIsAdmin } from "../../globalSlice";

const SignUpPage = () => {
    const { currentStep, confOk, persOk, captain, members } = useSelector((state) => state.signup)
    const { error, token } = useSelector((state) => state.global)
    const state = useSelector(state => state.signup)

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [capOk, setCapOk] = useState(false);
    const [memOk, setMemOk] = useState(false);

    useEffect(() => {
        if (token) {
            navigate('/stages')
        }
    }, [])

    useEffect(() => {
        const isMembersVaild = () => {
            if (!confOk || !persOk) {
                setMemOk(false);
                return;
            }

            for (const member of members) {
                for (const key in member) {
                    if (key !== 'id') {
                        if (member[key].value.length < 3 || member[key].error === true) {
                            setMemOk(false);
                            return;
                        }
                    }
                }
            }

            setMemOk(true);
            return;
        }

        const isCaptainVaild = () => {
            for (const key in captain) {
                if (captain[key].value.length < 3 || captain[key].error === true) {
                    setCapOk(false);
                    return;
                }
            }

            setCapOk(true);
            return;
        }

        isCaptainVaild();
        isMembersVaild();
    }, [state])


    const fetchFormData = async () => {
        await axios.post('http://127.0.0.1:3000/auth/signup',
            {
                captain: {
                    teamname: captain.teamname.value.trim(),
                    phone: captain.phone.value.trim(),
                    email: captain.email.value.trim(),
                    password: captain.password.value.trim(),
                    username: captain.username.value.trim(),
                    fullname: captain.fullname.value.trim(),
                },
                subordinates: [
                    {
                        id: members[0].id,
                        phone: members[0].phone.value.trim(),
                        email: members[0].email.value.trim(),
                        username: members[0].username.value.trim(),
                    },
                    {
                        id: members[1].id,
                        phone: members[1].phone.value.trim(),
                        email: members[1].email.value.trim(),
                        username: members[1].username.value.trim(),
                    },
                    {
                        id: members[2].id,
                        phone: members[2].phone.value.trim(),
                        email: members[2].email.value.trim(),
                        username: members[2].username.value.trim(),
                    },
                    {
                        id: members[3].id,
                        phone: members[3].phone.value.trim(),
                        email: members[3].email.value.trim(),
                        username: members[3].username.value.trim(),
                    },
                ]
            },
            {
                headers: {
                    'Content-Type': 'application/json',
                }
            })
            .then((res) => res.data)
            .then((data) => {
                dispatch(setUser(data?.team || data?.admin));
                dispatch(setToken(data?.token));
                dispatch(setIsAdmin(data?.isAdmin));
                dispatch(setError(null))
                navigate('/auth');
            })
            .catch((err) => {
                dispatch(setError(err.response.data.message))
                console.log(err)
            })

    }

    const setStepHandle = () => {
        if (currentStep === 1) {
            dispatch(setCurrentStep(2));
        } else {
            fetchFormData();
            dispatch(setCurrentStep(1));
        }
    }

    const backHandle = () => {
        dispatch(setCurrentStep(1))
    }

    return (
        <div className="auth-container">
            <h2 className="auth-title">Регистрация</h2>

            {error && (
                <div className="error-container">
                    <span>{error}</span>
                </div>
            )}

            {currentStep === 1 ? (
                <SignCap />
            ) : (
                <SignMembers />
            )}

            <div className="auth-footer">
                <button disabled={currentStep === 1 ? (!capOk) : (!memOk)} onClick={setStepHandle} className="auth-btn">{currentStep === 1 ? 'ДАЛЕЕ' : 'ЗАРЕГИСТРИРОВАТЬСЯ'}</button>
                {currentStep === 2 && <button className="auth-btn back-btn" onClick={backHandle}>НАЗАД</button>}
                <hr />
                <span>УЖЕ ЕСТЬ АККАУНТ?<br /><a onClick={() => navigate('/auth')}>ВОЙТИ</a></span>
            </div>
        </div>
    );
}

const SignCap = () => {
    const { captain } = useSelector((state) => state.signup)

    const dispatch = useDispatch();

    const inputRef = useMask({
        mask: '+7 (___) ___-__-__',
        replacement: { _: /\d/ },
    });

    const userRef = useMask({
        mask: '@_______________________________',
        replacement: {
            '_': /[a-zA-Z0-9_]/,
        },
    });

    const teamnameHandle = (e) => {
        dispatch(setCaptainField({ field: 'teamname', value: e.target.value.trimLeft().replace(/[^a-zA-Zа-яА-Я_ ]/g, "") }))

        if (e.target.value.trim().length < 3) {
            dispatch(setCaptainError({ field: 'teamname', error: true }))
        } else {
            dispatch(setCaptainError({ field: 'teamname', error: false }))
        }
    }

    const fullnameHandle = (e) => {
        dispatch(setCaptainField({ field: 'fullname', value: e.target.value.trimLeft().replace(/[^a-zA-Zа-яА-Я ]/g, "") }))

        if (e.target.value.trim().split(' ').length < 2) {
            dispatch(setCaptainError({ field: 'fullname', error: true }))
        } else {
            dispatch(setCaptainError({ field: 'fullname', error: false }))
        }
    }

    const emailHandle = (e) => {
        dispatch(setCaptainField({ field: 'email', value: e.target.value.replace(/[^a-zA-Z0-9_@.]/g, "") }))

        if (!/^[^@]+@[^@]+\.[^@]+$/.test(e.target.value)) {
            dispatch(setCaptainError({ field: 'email', error: true }))
        } else {
            dispatch(setCaptainError({ field: 'email', error: false }))
        }
    }

    const phoneHandle = (e) => {
        dispatch(setCaptainField({ field: 'phone', value: e.target.value }))

        if (e.target.value.length < 18) {
            dispatch(setCaptainError({ field: 'phone', error: true }))
        } else {
            dispatch(setCaptainError({ field: 'phone', error: false }))
        }
    }

    const usernameHandle = (e) => {
        dispatch(setCaptainField({ field: 'username', value: e.target.value.replace(/[^a-zA-Z0-9_@]/g, "") }))

        if (e.target.value.length < 2) {
            dispatch(setCaptainError({ field: 'username', error: true }))
        } else {
            dispatch(setCaptainError({ field: 'username', error: false }))
        }
    }

    const passwordHandle = (e) => {
        dispatch(setCaptainField({ field: 'password', value: e.target.value.replace(/[^a-zA-Z0-9_!?@#]/g, "").trim() }))

        if (e.target.value.length < 5) {
            dispatch(setCaptainError({ field: 'password', error: true }))
        } else {
            dispatch(setCaptainError({ field: 'password', error: false }))
        }
    }

    const passwordRepHandle = (e) => {
        dispatch(setCaptainField({ field: 'passwordRep', value: e.target.value.replace(/[^a-zA-Z0-9_!?@#]/g, "").trim() }))

        if (captain.password.value !== e.target.value) {
            dispatch(setCaptainError({ field: 'passwordRep', error: true }))
        } else {
            dispatch(setCaptainError({ field: 'passwordRep', error: false }))
        }
    }

    return (
        <div className="auth-fields-container">
            <Input error={captain.teamname.error} value={captain.teamname.value} onChange={teamnameHandle} label="Название команды" id="name" placeholder="Гангстеры" />
            <Input error={captain.fullname.error} value={captain.fullname.value} onChange={fullnameHandle} label="ФИО капитана" id="fioCap" placeholder="Иванов Иван Иванович" />
            <Input error={captain.email.error} value={captain.email.value} onChange={emailHandle} type={'email'} label="Email капитана" id="mailCap" placeholder="mail@yandex.ru" />
            <Input error={captain.phone.error} value={captain.phone.value} onChange={phoneHandle} ref={inputRef} label="Телефон капитана" id="telCap" placeholder="+7 (123) 456-78-90" />
            <Input ref={userRef} error={captain.username.error} value={captain.username.value} onChange={usernameHandle} label="Username капитана" id="userCap" placeholder="@user" />
            <Input error={captain.password.error} value={captain.password.value} onChange={passwordHandle} type='password' label="Пароль для входа в квест" id="passCap" />
            <Input error={captain.passwordRep.error} value={captain.passwordRep.value} onChange={passwordRepHandle} type='password' label="Повторите пароль" id="passrepCap" />
        </div>
    )
}

const SignMembers = () => {
    const { members, currentMember, confOk, persOk } = useSelector((state) => state.signup)
    const dispatch = useDispatch();

    const clickHandle = (memberId) => {
        if (currentMember !== memberId) {
            dispatch(setCurrentMember(memberId))
        }
    }

    const checkHandle = (e, field) => {
        dispatch(setCheck({ field, value: e.target.checked }))
    }

    return (
        <div className="auth-fields-container">
            {members.map((member) => (
                <div onClick={() => clickHandle(member.id)} key={member.id} className={`${currentMember === member.id ? 'member-open' : ''} ${!member.email.error && !member.phone.error && !member.username.error && member.phone.value.length == 18 && member.username.value.length > 1 && member.email.value.length > 3 ? 'member-full' : ''} member`}>
                    <div className={`${!member.email.error && !member.phone.error && !member.username.error && member.phone.value.length == 18 && member.username.value.length > 2 && member.email.value.length > 3 ? 'member-title-full' : ''} member-title`}>
                        Член команды №{member.id}
                        <img className={currentMember === member.id ? 'expand-icon less' : 'expand-icon'} src={expand} alt="" />
                    </div>
                    <MemberFields member={member} />
                </div>
            ))}

            <Checkbox value={confOk} onChange={(e) => checkHandle(e, 'confOk')} href='#' label="Я СОГЛАСЕН С" link="ПОЛИТИКОЙ КОНФИДЕНЦИАЛЬНОСТИ" id="conf" />
            <Checkbox value={persOk} onChange={(e) => checkHandle(e, 'persOk')} href='#' label="Я СОГЛАСЕН НА" link="ОБРАБОТКУ ПЕРСОНАЛЬНЫХ ДАННЫХ" id="pers" />
        </div>
    )
}

const MemberFields = ({ member }) => {
    const dispatch = useDispatch();

    const inputRef = useMask({
        mask: '+7 (___) ___-__-__',
        replacement: { _: /\d/ },
    });

    const userRef = useMask({
        mask: '@_______________________________',
        replacement: {
            '_': /[a-zA-Z0-9_]/,
        },
    });


    const emailHandle = (e) => {
        dispatch(setMemberField({ id: member.id, field: 'email', value: e.target.value.replace(/[^a-zA-Z0-9_@.]/g, "") }))

        if (!/^[^@]+@[^@]+\.[^@]+$/.test(e.target.value)) {
            dispatch(setMemberError({ id: member.id, field: 'email', error: true }))
        } else {
            dispatch(setMemberError({ id: member.id, field: 'email', error: false }))
        }
    }

    const phoneHandle = (e) => {
        dispatch(setMemberField({ id: member.id, field: 'phone', value: e.target.value }))

        if (e.target.value.length < 18) {
            dispatch(setMemberError({ id: member.id, field: 'phone', error: true }))
        } else {
            dispatch(setMemberError({ id: member.id, field: 'phone', error: false }))
        }
    }

    const usernameHandle = (e) => {
        dispatch(setMemberField({ id: member.id, field: 'username', value: e.target.value }))

        if (e.target.value.length < 2) {
            dispatch(setMemberError({ id: member.id, field: 'username', error: true }))
        } else {
            dispatch(setMemberError({ id: member.id, field: 'username', error: false }))
        }
    }

    return (
        <div className="auth-fields-container">
            <Input error={member.email.error} value={member.email.value} onChange={emailHandle} label="Email" id={`mail${member.id}`} placeholder="mail@yandex.ru" />
            <Input error={member.phone.error} value={member.phone.value} onChange={phoneHandle} ref={inputRef} label="Телефон" id={`tel${member.id}`} placeholder="+7 (123) 456-78-90" />
            <Input ref={userRef} error={member.username.error} value={member.username.value} onChange={usernameHandle} label="Username" id={`user${member.id}`} placeholder="@user" />
        </div>
    );
}


export default SignUpPage;
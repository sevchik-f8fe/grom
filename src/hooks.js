import { useEffect } from "react";
import { useLocation } from "react-router-dom";

import stage_bg from './assets/img/bg/stage_bg.png';
import bg from './assets/img/bg/bg.png';
import full_bg from './assets/img/bg/full_bg.png';
import { useDispatch } from "react-redux";
import { setError } from "./globalSlice";

export default function ScrollToTop() {
    const { pathname } = useLocation();

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(setError(null))
        window.scrollTo(0, 0);
    }, [pathname]);

    return null;
}

export const SetBG = () => {
    const { pathname } = useLocation();

    useEffect(() => {
        if (pathname === '/stages') {
            document.documentElement.style.setProperty('--bg-url', `url(${stage_bg})`);
        } else if (/^\/stages\/([1-9]|10)$/.test(pathname) || pathname === '/finish') {
            document.documentElement.style.setProperty('--bg-url', `url(${bg})`);
        } else {
            document.documentElement.style.setProperty('--bg-url', `url(${full_bg})`);
        }

    }, [pathname]);
}

//document.documentElement.style.setProperty('--main-bg-color', 'red');
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

import stage_bg from './assets/img/bg/stage_bg.png';
import bg from './assets/img/bg/bg.png';
import full_bg from './assets/img/bg/full_bg.png';
import { useDispatch, useSelector } from "react-redux";
import { setError, setSocket } from "./globalSlice";
import { useGeolocated } from "react-geolocated";

export const ScrollToTop = () => {
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

export const UseWebSocket = () => {
    const { error, user, token, socketState } = useSelector(state => state.global);
    const dispatch = useDispatch();

    useEffect(() => {
        const newSocket = new WebSocket('ws://localhost:8080');

        newSocket.onopen = () => {
            console.log('Connected to WebSocket server');
            dispatch(setSocket({ readyState: newSocket.readyState, send: (msg) => { newSocket.send(msg) } }));
        };

        newSocket.onclose = () => {
            console.log('Disconnected from WebSocket server');
        };
    }, [error, user, token, socketState]);

    return null;
}

export const UseGeo = () => {
    const { positionError, coords, isGeolocationAvailable, isGeolocationEnabled } =
        useGeolocated({
            positionOptions: {
                enableHighAccuracy: true,
            },
            watchPosition: true,
            userDecisionTimeout: 30000,
        });
    const { error, user, token, socketState, socketSendHandle, isAdmin } = useSelector(state => state.global);
    const dispatch = useDispatch();

    useEffect(() => {
        const sendMessage = (msg) => {
            if (!isAdmin && token && user && socketState && socketState === WebSocket.OPEN) {
                try {
                    socketSendHandle(JSON.stringify({ teamName: user.teamName, coords: msg }));
                    console.log(JSON.stringify({ teamName: user.teamName, coords: msg }));
                } catch (e) {
                    console.log('s e: ', e);
                }
            } else {
                console.log('o')
            }
        };

        if (isGeolocationAvailable && isGeolocationEnabled && coords) {
            sendMessage([coords.latitude, coords.longitude])
            dispatch(setError(null))
        } else {
            console.log('er: ', positionError, isGeolocationAvailable, isGeolocationEnabled);
            dispatch(setError('Ошибка определения местонахождения: ', positionError))
        }
    }, [coords, isGeolocationAvailable, isGeolocationEnabled, positionError])

    return null;
}

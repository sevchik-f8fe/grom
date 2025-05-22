import { nanoid } from "nanoid";
import { Map, Placemark, YMaps } from "@pbe/react-yandex-maps";

import mark from "../../assets/img/geoMark.png"
import { useEffect } from "react";
import { setTeams, updateTeam } from "./AdminSlice";
import { useDispatch } from "react-redux";

const AdminPage = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        // const socket = io('ws://localhost:8080');
        const newSocket = new WebSocket('ws://localhost:8080');

        // newSocket.onopen = () => {
        //     console.log('Connected to WebSocket server');
        // };

        newSocket.onmessage = (team) => {
            dispatch(updateTeam({ teamName: team.teamName, currentCoords: team.currentCoords }))
        };

        // newSocket.onclose = () => {
        //     console.log('Disconnected from WebSocket server');
        // };

        // return () => {
        //     newSocket.close();
        // };
    }, [])

    const dataList = [
        {
            coords: [59.871931, 30.265915],
            onClickEvent: () => console.log('a'),
        },
        {
            coords: [59.90311, 30.318409],
            onClickEvent: () => console.log('a'),
        },
        {
            coords: [59.90909, 30.257961],
            onClickEvent: () => console.log('a'),
        },
    ];

    const mapState = {
        center: [59.938886, 30.313838],
        zoom: 10,
        bounds: [[59.809178, 30.077169], [60.062201, 30.491047]],
    }

    const mapOptions = {
        controls: [],
        suppressMapOpenBlock: true,
        restrictMapArea: true,
        maxZoom: 15,
        minZoom: 3
    };

    const placemarkOptions = {
        iconLayout: 'default#image',
        iconImageHref: mark,
        iconImageSize: [40, 40],
    };

    return (
        <div className="admin-container">
            <div className="map-container">
                <YMaps>
                    <Map
                        width={'100%'}
                        height={'60vh'}
                        defaultState={mapState}
                        options={mapOptions}
                    >
                        {dataList.map((elem) => <Placemark key={nanoid()} options={placemarkOptions} onClick={elem.onClickEvent} geometry={elem.coords} />)}
                    </Map>
                </YMaps>
            </div>

            <div className="admin-text-container">
                <div className="admin-text-block">
                    <span className="admin-text">ВСЕГО УЧАСТИНКОВ:</span>
                    <span className="admin-text">100</span>
                </div>
                <div className="admin-text-block">
                    <span className="admin-text">ВСЕГО КОМАНД:</span>
                    <span className="admin-text">10</span>
                </div>
            </div>
        </div>
    );
}


export default AdminPage;
import { nanoid } from "nanoid";
import { Map, Placemark, YMaps } from "@pbe/react-yandex-maps";

import mark from "../../assets/img/geoMark.png"
import markInactive from "../../assets/img/geoMarkInactive.png"
import { useEffect } from "react";
import { setCurrentTeam, setTeams, updateTeam } from "./AdminSlice";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { setError } from "../../globalSlice";

const AdminPage = () => {
    const { teams, currentTeam } = useSelector(state => state.admin)
    const dispatch = useDispatch();

    useEffect(() => {
        //     if (!token || !isAdmin) {
        //         navigate('/auth');
        //         return;
        //     } else {
        const newSocket = new WebSocket('ws://localhost:8080');

        newSocket.onmessage = (team) => {
            console.log('recieved msg to admin')
            dispatch(updateTeam({ teamName: team.teamName, currentCoords: team.currentCoords }))
        };
        //    }

    }, [])

    useEffect(() => {
        const fetchTeams = async () => {
            await axios.post('http://127.0.0.1:3000/admin/getTeams',
                {
                    headers: {
                        'Content-Type': 'application/json',
                    }
                })
                .then((res) => res.data)
                .then((data) => {
                    dispatch(setTeams(data.teams));
                    dispatch(setError(null))
                })
                .catch((err) => {
                    dispatch(setError(err.response.data.message))
                    console.log(err)
                })
        }
        //     if (!token || !isAdmin) {
        //         navigate('/auth');
        //         return;
        //     } else {
        fetchTeams();
        //}
    }, [])

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

    const curretnPlacemarkOptions = {
        iconLayout: 'default#image',
        iconImageHref: markInactive,
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
                        {teams?.map((elem) => <Placemark
                            key={nanoid()}
                            options={elem.teamName == currentTeam?.teamname ? curretnPlacemarkOptions : placemarkOptions}
                            onClick={() => {
                                dispatch(setCurrentTeam(elem?.onClickHandle()))
                            }}
                            geometry={elem?.currentCoords}
                        />)}
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

                <div className="admin-team-container">
                    {currentTeam ? (
                        <div className="admin-team">
                            <div className="admin-team-element">
                                <span className="admin-team-text">Команда:</span>
                                <span className="admin-team-text">{currentTeam.teamname}</span>
                            </div>
                            <div className="admin-team-element">
                                <span className="admin-team-text">Капитан:</span>
                                <span className="admin-team-text">{currentTeam.fullname}</span>
                            </div>
                            <div className="admin-team-element">
                                <span className="admin-team-text">Телеграмм:</span>
                                <span className="admin-team-text tg">{currentTeam.username}</span>
                            </div>
                            <div className="admin-team-element">
                                <span className="admin-team-text">Текущая точка:</span>
                                <span className="admin-team-text">№ {currentTeam.currentPoint}</span>
                            </div>
                        </div>
                    ) : (
                        <span className="admin-team-err">вы можете выбрать одну из команд на карте, чтобы узнать подробную информацию о ней</span>
                    )}
                </div>
            </div>
        </div>
    );
}


export default AdminPage;
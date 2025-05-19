import { useDispatch, useSelector } from "react-redux";
import { setCloseTeam, setListIsOpen, setOpenTeamId } from "./AdminSlice";
import { nanoid } from "nanoid";
import { useEffect, useRef } from "react";

import expand from "../../assets/img/expand_icon.png"
import { Map, YMaps } from "@pbe/react-yandex-maps";

const AdminPage = () => {
    const mapContainerRef = useRef(null);

    const dataList = [
        {
            coords: [51.0000, 51.0000],
            onClickEvent: () => alert('a'),
        },
        {
            coords: [51.0001, 51.0001],
            onClickEvent: () => alert('a'),
        },
        {
            coords: [51.0003, 51.0003],
            onClickEvent: () => alert('a'),
        },
    ];

    useEffect(() => {
        const uploadMap = async () => {
            initMap();

            async function initMap() {

            }
        }

        uploadMap();
    }, []);


    const mapState = {
        center: [59.938886, 30.313838],
        zoom: 10,
        bounds: [[59.809178, 30.077169], [60.062201, 30.491047]], // Границы карты
    }

    const mapOptions = {
        controls: [],
        suppressMapOpenBlock: true,
        restrictMapArea: true,
        maxZoom: 15,
        minZoom: 3
    };

    return (
        <div className="admin-container">
            <div className="map-container" ref={mapContainerRef}>
                <YMaps>
                    <Map
                        width={'100%'}
                        height={'60vh'}
                        defaultState={mapState}
                        options={mapOptions}
                    // defaultOptions={{ maxZoom: 12, minZoom: 12 }}
                    />
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


            {/* на не надо хуй знает */}
            <TeamList />
        </div>
    );
}

const TeamList = () => {
    const { listIsOpen, openTeamId, teams } = useSelector(state => state.admin)
    const dispath = useDispatch();

    const changeListHandle = () => {
        dispath(setListIsOpen(!listIsOpen))
    }

    const openTeamHandle = (id) => {
        if (openTeamId === id) {
            dispath(setOpenTeamId(id))
        } else {
            dispath(setCloseTeam())
        }
    }

    return (
        <div className={`${listIsOpen ? 'admin-list-open' : ''} admin-list`}>
            <>
                <div className="team-list-header" onClick={changeListHandle}>
                    <span>ПОКАЗАТЬ КОМАНДЫ</span>
                    <img className={listIsOpen ? 'expand-icon less' : 'expand-icon'} src={expand} alt="" />
                </div>
                {[1, 3, 3, 10, 5]
                    .sort((a, b) => b - a)
                    .map((team) => <Team currentPoint={team} key={nanoid()} />)}
            </>
        </div>
    )
}

const Team = ({ teamname, currentPoint, capFullname }) => {
    return (
        <div className="list-team-element">
            <span className="list-team-title">Гангстеры</span>
            <span>Точка: <span style={{ color: '#E05100' }}>№{currentPoint}</span></span>
            <span>Капитан: Иванов И. И.</span>
        </div>
    );
}

export default AdminPage;
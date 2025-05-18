import { useDispatch, useSelector } from "react-redux";
import { setCloseTeam, setListIsOpen, setOpenTeamId } from "./AdminSlice";
import { nanoid } from "nanoid";

import expand from "../../assets/img/expand_icon.png"

const AdminPage = () => {
    return (
        <div className="admin-container">
            <div className="map-container">

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
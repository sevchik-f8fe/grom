import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";

const Header = () => {
    const navigate = useNavigate();
    const { token } = useSelector(state => state.global);
    const location = useLocation();

    return (
        //class auth
        <header className="header">
            <h1 onClick={() => {
                if (!token || token.length < 5) {
                    navigate('/');
                }
            }}>ГРОМ КВЕСТ</h1>
            {(location.pathname == '/' && (!token || token.length < 5)) && (
                <button onClick={() => navigate('/auth')} className="header-btn login-btn">войти</button>
            )}
        </header>
    );
}

export default Header;
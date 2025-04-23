import { useLocation, useNavigate } from "react-router-dom";

const Header = () => {
    const navigate = useNavigate();
    const location = useLocation();

    return (
        //class auth
        <header className="header">
            <h1>ГРОМ КВЕСТ</h1>
            {location.pathname == '/' && (
                <button onClick={() => navigate('/auth')} className="header-btn login-btn">войти</button>
            )}
        </header>
    );
}

export default Header;
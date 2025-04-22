import i18 from "../assets/img/foot/18.svg";
import ivk from "../assets/img/foot/vk.svg";
import itg from "../assets/img/foot/tg.svg";

const Footer = () => {
    return (
        <footer className="footer">
            <div className="footer-text">
                <span><span className="copy">&copy;</span>2025</span><br />
                <span>все права защищены</span>
            </div>
            <div className="footer-links">
                <a href="" className="footer-link">
                    <img src={i18} alt="" className="footer-link-img" />
                </a>
                <a href="" className="footer-link">
                    <img src={ivk} alt="" className="footer-link-img" />
                </a>
                <a href="" className="footer-link">
                    <img src={itg} alt="" className="footer-link-img" />
                </a>
            </div>
        </footer>
    );
}

//prokachka na noviy stupen aytistochik and golem ahehahabhaaah ffhahahaahha html 6.0 ebaniy 
export default Footer; 
import {Link} from 'react-router-dom';

function Footer(): JSX.Element {
    return (
        <Link className="footer__logo-link" to="main.html">
            <img 
                className="footer__logo" 
                src="img/logo.svg" 
                alt="6 cities logo" 
                width={64} 
                height={33}
            />
        </Link>
    );
}

export default Footer;
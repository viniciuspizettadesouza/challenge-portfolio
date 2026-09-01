import { Link } from 'react-router-dom';
import '../index.css';

export default function NavBar() {
    return (
        <>
            <nav className="nav-container">
                <Link to="/sign-up"><button className="nav-button">Sign Up</button></Link>
                <Link to="/sign-in"><button className="nav-button button-margin">Sign In</button></Link>
            </nav>

            <h1>Vite + React</h1>
            <h2>User Management Challenge</h2>
        </>
    );
}


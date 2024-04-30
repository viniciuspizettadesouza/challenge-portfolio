import { useState, useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import NavBar from '../components/navbar'
import '../index.css';

export default function Root() {
    const navigate = useNavigate();
    const [session] = useState<string | null>(sessionStorage.getItem('token'))

    useEffect(() => {
        if (session) {
            navigate("/welcome")
        } else {
            navigate("/sign-up");
        }
    }, [session, navigate]);

    return (
        <>
            <div className="container">
                <NavBar />
                <h1>Vite + React</h1>
                <h2>1 Global</h2>
                <Outlet />
            </div>
        </>
    );
}

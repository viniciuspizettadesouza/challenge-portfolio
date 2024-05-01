import { useState, useEffect } from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import '../index.css';

export default function Root() {
    const navigate = useNavigate();
    const location = useLocation();
    const [sessionChecked, setSessionChecked] = useState(false);

    useEffect(() => {
        const session = sessionStorage.getItem('challenge/token');
        if (session) {
            navigate("/welcome");
        } else if (location.pathname !== '/sign-up' && location.pathname !== '/sign-in') {
            navigate("/sign-up");
        }

        setSessionChecked(true);
    }, [navigate, location.pathname]);

    if (!sessionChecked) {
        return null;
    }

    return (
        <div className="container">
            <Outlet />
        </div>
    );
}

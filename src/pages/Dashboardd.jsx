import DashboardPage from "../components/DashboardPage";
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

function Dashboardd() {
    const navigate = useNavigate();
    const isLoggedIn = localStorage.getItem("loggedIn") === "true";

    useEffect(() => {
        // Se l'utente non è autenticato, reindirizza alla pagina di login
        if (!isLoggedIn) {
            navigate('/login');
        }
    }, [isLoggedIn, navigate]);

    // Se l'utente non è autenticato, non renderizzare nulla
    if (!isLoggedIn) {
        return null;
    }

    return (
        <>
            <DashboardPage/>
        </>
    );
}

export default Dashboardd;
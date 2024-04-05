import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux'
import { login, logout } from '../features/Auth/LoggedIn'

function LogoutButton() {
    const navigate = useNavigate();
    /* Variabile redux store */
  const loggedIn = useSelector((state) => state.LoggedIn.value);
  const dispatch = useDispatch();

    const handleLogout = () => {
        // Rimuovi le informazioni di autenticazione (ad esempio, token, sessione, ecc.)
        sessionStorage.removeItem('loggedIn');
        sessionStorage.removeItem('userData');

        dispatch(logout()); /* mette la variabile logout a false */

        // Reindirizza l'utente alla pagina di login
        navigate('/login');
    };

    return (
        <>
        <Button variant="outline-light" size='sm' onClick={handleLogout}>Logout</Button>
        </>
    );
}

export default LogoutButton;

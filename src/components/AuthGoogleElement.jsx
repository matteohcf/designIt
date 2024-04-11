import Container from "@mui/material/Container";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import Button from "@mui/material/Button";
import { signInWithPopup, getAuth, getRedirectResult, GoogleAuthProvider } from "firebase/auth";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { login, logout } from '../features/Auth/LoggedIn';

function AuthGoogle() {

    const auth = getAuth();
    const [error, setError] = useState("");
    const navigate = useNavigate();
    /* Variabile redux store */
    const loggedIn = useSelector((state) => state.LoggedIn.value);
    const dispatch = useDispatch();

    /* Se è già loggato vai alla dahsboard */
  useEffect(() => {
    const isLoggedIn = sessionStorage.getItem("loggedIn") === "true";
    if (isLoggedIn) {
      navigate("/dashboard");
    }
  }, []);

    const handleGoogleLogin = () => {
        const provider = new GoogleAuthProvider(); /* Crea un provider di autenticazione Google */
        signInWithPopup(auth, provider) /* Avvia il processo di autenticazione con Google */
            .then((result) => {
                const user = result.user;
                /* console.log("User:", user); */
                /* user.email = "ciaoddddd@gmail.com";
                user.displayName = "cidda"; */
                /* console.log(user.email);
                console.log(user.displayName); */
                axios
                .post("https://matteocarrara.it/api/paletteAPI/authGoogle.php", {
                  token: user.accessToken,
                  google: true,
                  email: user.email,
                  username: user.displayName,
                })
                .then((response) => {
                  /* console.log(response); */
                  if (response.data.status === "success") {
                    /* console.log(response.data); */
                    sessionStorage.setItem("loggedIn", true);
                    sessionStorage.setItem(
                        "userData",
                        JSON.stringify(response.data.data)
                    );
                    dispatch(login());  /* Mette la variabile del metodo logina  true */
                    /* console.log(loggedIn); */
                    navigate("/dashboard");
                    /* console.log(response.data.data); */
                  } else {
                    setError(response.data);
                  }
                })
                .catch((error) => {
                  console.error(error);
                });
            // Ora puoi aggiungere logica aggiuntiva, ad esempio salvare l'utente nel tuo database
            })
            .catch((error) => {
            // Gestisci gli errori di autenticazione con Google
            setError(error.message);
            });
        };

    return (
        <>
        <Container className="mt-5" maxWidth="sm">
            <div className="titolo_principale">
                <span className='titolo_principale_background'>Accedi</span>:
            </div>
            <div className="titolo_principale_sottotitolo_div_google">
                <span className="titolo_principale_sottotitolo">
                    Effettua l'accesso con Google
                </span>
            </div>
            <div className="mt-3">
                <Button variant="contained" size="large" color="secondary" onClick={handleGoogleLogin}>
                    Accedi
                </Button>
            </div>
        </Container>
        </>
    );
}

export default AuthGoogle;
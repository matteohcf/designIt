import React, { useState, useEffect } from "react";
import axios from "axios";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Alert from "@mui/material/Alert";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import IconButton from "@mui/material/IconButton";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { Link } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { login, logout } from '../features/Auth/LoggedIn';
import ReCAPTCHA from "react-google-recaptcha";
import AuthGoogleElement from "./AuthGoogleElement";
/* import './LoginElement.css'; */
import './style.css';

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const [recaptchaValue, setRecaptchaValue] = useState(""); /* Recapcha */

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

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  /* Recapcha */
  const onChangeRecaptcha = (value) => {
    setRecaptchaValue(value);
    setError(""); /* Reset dell'errore */
  }

  const handleSubmit = (event) => {
    if (!recaptchaValue) { /* Rechapta errore Obbligatorio */
      setError("Captcha obbligatorio");
      return;
    }
    event.preventDefault();
    axios
      .post("https://matteocarrara.it/api/paletteAPI/login.php", {
        email: email,
        password: password,
      })
      .then((response) => {
        /* console.log(response.data.data); */
        if (response.data.status === "success") {
          sessionStorage.setItem("loggedIn", true);
          sessionStorage.setItem(
            "userData",
            JSON.stringify(response.data.data)
          );
          dispatch(login());  /* Mette la variabile del metodo logina  true */
          /* console.log(loggedIn); */
          navigate("/dashboard");
        } else {
          setError(response.data.message);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        marginTop: "4%",
      }}
    >
      <Container className="login_container cointainer_principale" maxWidth="sm">
        <form /* onSubmit={handleSubmit} */>
          {/* <Typography
            style={{ marginBottom: "20px" }}
            variant="h2"
            component="h2"
          >
            Login
          </Typography> */}
          <div className="titolo_principale mb-3">
                <span className='titolo_principale_background'>Login</span>:
            </div>
          {error && (
            <Alert style={{ marginBottom: "20px" }} severity="error">
              {error}
            </Alert>
          )}
          <TextField
            type="email"
            value={email}
            onChange={handleEmailChange}
            variant="filled"
            id="email"
            label="Email"
            fullWidth
            style={{ marginBottom: "20px" }}
            color="secondary"
          />
          <TextField
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={handlePasswordChange}
            variant="filled"
            id="password"
            label="Password"
            fullWidth
            style={{ marginBottom: "20px" }}
            color="secondary"
            InputProps={{
              endAdornment: (
                <IconButton className="showPassword_button" onClick={handleShowPassword}>
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              ),
            }}
          />
          <div>
            <Button variant="contained" /* type="submit" */ onClick={handleSubmit} size="large" color="secondary">
              Login
            </Button>
          </div>
          <div className="mt-3">
            <AuthGoogleElement/>
          </div>
          <Typography
            variant="body1"
            gutterBottom
            className="mt-3"
          >
            Non hai un account? <Link to="/register"> <strong>Register</strong> </Link>
          </Typography>
          {/* Recapta */}
          <ReCAPTCHA className="mt-3"
            theme="dark"
            sitekey="6Lf7A58pAAAAAHY5UnYVj-E8O_TSjMQlwg4p14XG"
            onChange={onChangeRecaptcha}
          />
        </form>
      </Container>
    </Box>
  );
}

export default Login;
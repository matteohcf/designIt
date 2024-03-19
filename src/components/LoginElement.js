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
import { useSelector, useDispatch } from 'react-redux'
import { login, logout } from '../features/Auth/LoggedIn'
/* import './LoginElement.css'; */
import './style.css';

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  /* Variabile redux store */
  const loggedIn = useSelector((state) => state.LoggedIn.value);
  const dispatch = useDispatch();

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

  const handleSubmit = (event) => {
    event.preventDefault();
    axios
      .post("http://localhost:8888/Programmazione%20Web/paletteAPI/login.php", {
        email: email,
        password: password,
      })
      .then((response) => {
        console.log(response);
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
        marginTop: "5%",
      }}
    >
      <Container className="login_container" maxWidth="sm">
        <form onSubmit={handleSubmit}>
          <Typography
            style={{ marginBottom: "20px" }}
            variant="h2"
            component="h2"
          >
            Login
          </Typography>
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
            label="Email address"
            fullWidth
            style={{ marginBottom: "20px" }}
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
            InputProps={{
              endAdornment: (
                <IconButton className="showPassword_button" onClick={handleShowPassword}>
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              ),
            }}
          />
          <Button variant="contained" type="submit">
            Login
          </Button>
          <Typography
            variant="body1"
            gutterBottom
            style={{ marginTop: "20px" }}
          >
            Non hai un account? <Link to="/register"> <strong>Register</strong> </Link>
          </Typography>
        </form>
      </Container>
    </Box>
  );
}

export default Login;
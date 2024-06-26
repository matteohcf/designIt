import axios from "axios";
import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Alert from "@mui/material/Alert";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { Link } from "react-router-dom";
import ReCAPTCHA from "react-google-recaptcha";
import { useNavigate } from 'react-router-dom';
import AuthGoogleElement from "./AuthGoogleElement";
import './style.css';

function Register() {
  const apiUrl = process.env.REACT_APP_API_URL;
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [apiResponse, setApiResponse] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [recaptchaValue, setRecaptchaValue] = useState(""); /* Recapcha */
  const navigate = useNavigate();
  const generatePassword = () => {
    const length = 12;
    const charset =
      "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    let password = "";
    for (let i = 0, n = charset.length; i < length; ++i) {
      password += charset.charAt(Math.floor(Math.random() * n));
    }
    return password;
  };

  /* Se è già loggato vai alla dahsboard */
  useEffect(() => {
    const isLoggedIn = localStorage.getItem("loggedIn") === "true";
    if (isLoggedIn) {
      navigate("/dashboard");
    }
  }, []);

  const handleGeneratePassword = () => {
    setPassword(generatePassword());
  };

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  /* Recapcha */
  const onChangeRecaptcha = (value) => {
    setRecaptchaValue(value);
    setError(""); /* Reset dell'errore */
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!recaptchaValue) { /* Rechapta errore Obbligatorio */
      setError("Captcha obbligatorio");
      return;
    }
    /* event.preventDefault(); */
    axios
      .post(`${apiUrl}/register.php`, {
        username: username,
        email: email,
        password: password,
      })
      .then((response) => {
        /* console.log(response); */
        setApiResponse(response.data.message);
        if (response.data.status === "success") {
          setTimeout(() => {
            navigate("/login");
          }, 3000);
        }
      })
      .catch((error) => {
        console.error(error);
        setApiResponse(error.response.data.message);
      });
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        marginTop: "1%",
      }}
    >
      <Container className="register_container cointainer_principale" maxWidth="sm">
        <form /* onSubmit={handleSubmit} */>
          {/* <Typography
            style={{ marginBottom: "20px" }}
            variant="h2"
            component="h2"
          >
            Register
          </Typography> */}
          <div className="titolo_principale mb-3">
                <span className='titolo_principale_background'>Register</span>:
            </div>
          {error && (
            <Alert style={{ marginBottom: "20px" }} severity="error">
              {error}
            </Alert>
          )}
          {apiResponse && (
            <Alert
              style={{ marginBottom: "20px" }}
              severity={apiResponse.includes("success") ? "success" : "error"}
            >
              {apiResponse}
            </Alert>
          )}
          <TextField
            type="text"
            value={username}
            onChange={handleUsernameChange}
            variant="filled"
            id="filled-basic1"
            label="Username"
            fullWidth
            style={{ marginBottom: "20px" }}
            color="secondary"
          />
          <TextField
            type="email"
            value={email}
            onChange={handleEmailChange}
            variant="filled"
            id="filled-basic2"
            label="Email"
            fullWidth
            style={{ marginBottom: "20px" }}
            color="secondary"
          />
          <div>
            <TextField
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={handlePasswordChange}
              variant="filled"
              id="filled-basic3"
              label="Password"
              fullWidth
              style={{ marginBottom: "10px" }}
              color="secondary"
              InputProps={{
                endAdornment: (
                  <IconButton className="showPassword_button" onClick={handleShowPassword}>
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                ),
              }}
            />
            <Button
              size="small"
              style={{ marginBottom: "9px" }}
              color="secondary"
              onClick={handleGeneratePassword}
            >
              Genera password
            </Button>
          </div>
          <div>
            <Button variant="contained" /* type="submit" */ onClick={handleSubmit} size="large" color="secondary">
              Register
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
            Hai già un account? <Link to="/login">< strong>Login</strong> </Link>
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

export default Register;
import axios from "axios";
import React, { useState } from "react";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Alert from "@mui/material/Alert";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { Link } from "react-router-dom";
/* import './RegisterElement.css'; */
import './style.css';

function Register() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [apiResponse, setApiResponse] = useState("");
  const [showPassword, setShowPassword] = useState(false);
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

  const handleSubmit = (event) => {
    event.preventDefault();

    axios
      .post("http://localhost:8888/Programmazione%20Web/paletteAPI/register.php", {
        username: username,
        email: email,
        password: password,
      })
      .then((response) => {
        console.log(response);
        setApiResponse(response.data.message);
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
        marginTop: "5%",
      }}
    >
      <Container className="register_container" maxWidth="sm">
        <form onSubmit={handleSubmit}>
          <Typography
            style={{ marginBottom: "20px" }}
            variant="h2"
            component="h2"
          >
            Register
          </Typography>
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
            id="filled-basic"
            label="Username"
            fullWidth
            style={{ marginBottom: "20px" }}
          />
          <TextField
            type="email"
            value={email}
            onChange={handleEmailChange}
            variant="filled"
            id="filled-basic"
            label="Email address"
            fullWidth
            style={{ marginBottom: "20px" }}
          />
          <div>
            <TextField
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={handlePasswordChange}
              variant="filled"
              id="filled-basic"
              label="Password"
              fullWidth
              style={{ marginBottom: "10px" }}
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
              style={{ marginBottom: "25px" }}
              onClick={handleGeneratePassword}
            >
              Genera password
            </Button>
          </div>
          <Button variant="contained" type="submit">
            Register
          </Button>
          <Typography
            variant="body1"
            gutterBottom
            style={{ marginTop: "20px" }}
          >
            Hai già un account? <Link to="/login">< strong>Login</strong> </Link>
          </Typography>
        </form>
      </Container>
    </Box>
  );
}

export default Register;
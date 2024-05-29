import React, { useEffect, useState } from "react";
import { Row, Col } from "react-bootstrap";
import axios from "axios";
import "./style.css";
import CardColor from "./CardColor";
import { useDispatch } from "react-redux";
import { logout } from "../features/Auth/LoggedIn";
import { useNavigate } from 'react-router-dom';

function MyPaletteFiltered() {
  const apiUrl = process.env.REACT_APP_API_URL;
  const [cards, setCards] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const token = localStorage.getItem("token");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    axios
      .get(`${apiUrl}/getPaletteFiltered.php`, {
        headers: {
          Authorization: `Bearer ${token}`, // Includi il token nell'header dell'autorizzazione
        },
      })
      .then((response) => {
        if (Array.isArray(response.data)) {
          /* console.log(response.data); */
          setCards(response.data);
        } else {
          setError("Dati non validi dal backend.");
        }
        setLoading(false);
      })
      .catch((error) => {
        if (error.response && error.response.status === 401) {
          console.log("Errore 401: Accesso non autorizzato o token scaduto");
          setError("Errore 401: Accesso non autorizzato o token scaduto");
          dispatch(logout());
          navigate("/login");
          setLoading(false);
        } else {
          console.error(error);
          setError("Errore nell'aggiornamento delle palette.");
          setLoading(false);
        }
      });
  }, []);

  return (
    <>
      <Row>
        {cards.slice(0).map((colors, index) => (
          <Col lg={3} md={3} xs={6} key={index}>
            <CardColor colors={colors} />
          </Col>
        ))}
      </Row>
    </>
  );
}

export default MyPaletteFiltered;

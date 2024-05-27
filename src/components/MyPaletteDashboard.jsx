import React, { useEffect, useState } from "react";
import { Row, Col } from "react-bootstrap";
import axios from "axios";
import "./style.css";
import CardColorDashboard from "./CardColorDashboard";

function MyPaletteDashboard() {
  const apiUrl = process.env.REACT_APP_API_URL;
  const [cards, setCards] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const token = localStorage.getItem("token");

  useEffect(() => {
    setLoading(true);
    axios
      .get(`${apiUrl}/getPaletteDashboard.php`, {
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
        console.error(error);
        setError("Errore nell'aggiornamento delle palette.");
        setLoading(false);
      });
  }, []);

  return (
    <>
      <Row>
        {cards.slice(0).map((colors, index) => (
          <Col lg={3} md={3} xs={6} key={index}>
            <CardColorDashboard colors={colors} />
          </Col>
        ))}
      </Row>
    </>
  );
}

export default MyPaletteDashboard;

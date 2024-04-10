import React, { useEffect, useState } from 'react';
import { Row, Col } from 'react-bootstrap';
import axios from 'axios';
import './style.css';
import CardColor from './CardColor';

function MyPaletteFiltered() {
    const [cards, setCards] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const creating_user_id = JSON.parse(sessionStorage.getItem("userData"));

    useEffect(() => {
        setLoading(true);
        axios.post("https://matteocarrara.it/api/paletteAPI/getPaletteFiltered.php", {
                creating_user_id: creating_user_id.id_utente,
            })
            .then((response) => {
                if (Array.isArray(response.data)) {
                    console.log(response.data);
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
                    <Col lg={3} md={6} xs={6} key={index}>
                        <CardColor colors={colors} />
                    </Col>
                ))}
            </Row>
        </>
    );
}

export default MyPaletteFiltered;

import React, { useEffect, useState } from 'react';
import { Row, Col } from 'react-bootstrap';
import axios from 'axios';
import './style.css';
import CardColorDashboard from './CardColorDashboard';

function MyPaletteDashboard() {
    const [cards, setCards] = useState([]);
    const [visibleCards, setVisibleCards] = useState(12);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const creating_user_id = JSON.parse(sessionStorage.getItem("userData"));

    useEffect(() => {
        setLoading(true);
        axios.post("https://matteocarrara.it/api/paletteAPI/getPaletteDashboard.php", {
                creating_user_id: creating_user_id.id_utente,
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

    const handleLoadMore = () => {
        setVisibleCards(prevVisibleCards => prevVisibleCards + 12);
    };

    return (
        <>
            <Row>
                {cards.slice(0, visibleCards).map((colors, index) => (
                    <Col lg={3} md={6} xs={6} key={index}>
                        <CardColorDashboard colors={colors} />
                    </Col>
                ))}
            </Row>
            {visibleCards < cards.length && (
                <div className="mt-5">
                    <div>
                        <svg xmlns="http://www.w3.org/2000/svg" onClick={handleLoadMore} width="50" height="50" fill="white" className="bi bi-arrow-down-circle-fill" viewBox="0 0 16 16">
                        <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0M8.5 4.5a.5.5 0 0 0-1 0v5.793L5.354 8.146a.5.5 0 1 0-.708.708l3 3a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 10.293z"/>
                        </svg>
                    </div>
                </div>
            )}
        </>
    );
}

export default MyPaletteDashboard;

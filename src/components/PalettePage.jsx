import { Container, Row, Col } from 'react-bootstrap';
import axios from "axios";
import { useEffect, useState } from 'react';
import CardColor from './CardColor';
import './style.css';
import { useSelector } from 'react-redux';

function PalettePage() {
    const [cards, setCards] = useState([]);
    const [visibleCards, setVisibleCards] = useState(20);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const loggedIn = useSelector((state) => state.LoggedIn.value);

    // Ottieni l'ID utente dal localStorage
    const id_utente_display = localStorage.getItem("id_utente") ? localStorage.getItem("id_utente") : "/";


    useEffect(() => {
        setLoading(true);
        /* console.log(id_utente_display); */
        axios.post('https://palette.matteocarrara.it/api/getPalette.php', {
            creating_user_id: id_utente_display,
        })
        .then(response => {
            /* console.log(response.data); */
            setCards(response.data);
            setLoading(false);
        })
        .catch(error => {
            console.error('Errore nella richiesta al database:', error);
            setLoading(false);
        });
    }, []);

    const handleLoadMore = () => {
        setVisibleCards(prevVisibleCards => prevVisibleCards + 20);
    };

    return (
        <Container className="mt-5 cointainer_principale">
             <div className="titolo_principale">
                    <span className='titolo_principale_background'>Palette:</span>
                </div>
                {/* <div className='titolo_principale_sottotitolo_div'>
                    <span className='titolo_principale_sottotitolo'>Next Generation Palette Tool</span>
                </div> */}
                <div className='sottotitolo_principale_home_div_palette'>
                    <span className='sottotitolo_principale_home'>Scopri le palette caricate dagli utenti!</span>
                </div>
            <Row className='mt-3 palettes'>
                {cards.slice(0, visibleCards).map((colors, index) => (
                    <Col lg={3} md={3} xs={6} key={index}>
                        <CardColor colors={colors} loggedIn={loggedIn}/>
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
        </Container>
    );
}

export default PalettePage;

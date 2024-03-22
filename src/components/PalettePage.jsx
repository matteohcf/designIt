import { Container, Row, Col } from 'react-bootstrap';
import axios from "axios";
import { useEffect, useState } from 'react';
import CardColor from './CardColor';
import './style.css';
import { useSelector } from 'react-redux'

function PalettePage() {
    const [cards, setCards] = useState([]);
    const [visibleCards, setVisibleCards] = useState(12); // Numero iniziale di palette da visualizzare
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const loggedIn = useSelector((state) => state.LoggedIn.value); /* Per controllare se è loggato */

    let id_utente_display = "/";

    if (loggedIn) {
      const id_utente = JSON.parse(sessionStorage.getItem("userData"));
      id_utente_display = id_utente.id_utente;
    } else {
        id_utente_display = "/";
    }

    // Effettua la richiesta delle palette dal DB
    useEffect(() => {
        setLoading(true); // Imposta lo stato di caricamento su true
        axios.get('http://ec2-16-16-251-126.eu-north-1.compute.amazonaws.com/getPalette.php')
            .then(response => {
                setCards(response.data);
                /* console.log(response.data); */
                setLoading(false); // Imposta lo stato di caricamento su false
            })
            .catch(error => {
                console.error('Errore nella richiesta al database:', error);
                setLoading(false); // Imposta lo stato di caricamento su false in caso di errore
            });
    }, []);

    /* Get Liked Palette */
        useEffect(() => {
            if (!loggedIn) {

            }
            axios.post("http://ec2-16-16-251-126.eu-north-1.compute.amazonaws.com/getLikedPalette.php", {
                    id_utente: id_utente_display,
                })
                .then((response) => {
                    /* console.log("Risposta dal backend:", response.data); */
                    const likedPalette = response.data;
                    /* console.log(likedPalette); */
                    /* console.log("Nuovo numero di like:", newLikes); */
                    
                })
                .catch((error) => {
                    console.error(error);
                    setError("Errore nell'aggiornamento dei like.");
                });
        }, []);

    // Gestore dell'evento per il pulsante "Load More"
    const handleLoadMore = () => {
        setVisibleCards(prevVisibleCards => prevVisibleCards + 8); // Aggiunge 4 alle palette da visualizzare
    };

    return (
        <>
            <Container className="mt-5 cointainer_principale">
                <div className="titolo_principale">
                    <span className='titolo_principale_background'>Palette:</span>
                </div>
                {/* <div className='titolo_principale_sottotitolo_div'>
                    <span className='titolo_principale_sottotitolo'>Next Generation Palette Tool</span>
                </div> */}
                <div className='sottotitolo_principale_home_div_palette'>
                    <span className='sottotitolo_principale_home'>Scropri le palette caricate dagli utenti!</span>
                </div>
                <Row className='mt-3'>
                    {cards.slice(0, visibleCards).map((colors, index) => (
                        <Col lg={3} md={6} xs={12} key={index}>
                            <CardColor colors={colors} />
                        </Col>
                    ))}
                </Row>
                {visibleCards < cards.length && ( // Mostra il pulsante "Load More" solo se ci sono altre palette da visualizzare
                    <div className="mt-5">
                        {/* <Button variant="light" onClick={handleLoadMore} disabled={loading}>
                            {loading ? 'Caricamento...' : 'Altro'}
                        </Button> */}
                        <div>
                            <svg xmlns="http://www.w3.org/2000/svg" onClick={handleLoadMore} width="50" height="50" fill="white" className="bi bi-arrow-down-circle-fill" viewBox="0 0 16 16">
                            <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0M8.5 4.5a.5.5 0 0 0-1 0v5.793L5.354 8.146a.5.5 0 1 0-.708.708l3 3a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 10.293z"/>
                            </svg>
                        </div>
                    </div>
                )}
            </Container>
        </>
    );
}

export default PalettePage;

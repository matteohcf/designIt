/* import './PalettePage.css'; */
import { Row, Col } from 'react-bootstrap';
import axios from "axios";
import { useEffect, useState } from 'react';
import CardColor from './CardColor';
import './style.css';

function MyPaletteDashboard() {
    const [cards, setCards] = useState([]);
    const [visibleCards, setVisibleCards] = useState(12); // Numero iniziale di palette da visualizzare
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const creating_user_id = JSON.parse(sessionStorage.getItem("userData"));
    /* console.log(creating_user_id.id_utente); */

    // Effettua la richiesta delle palette dal DB
    useEffect(() => {
        setLoading(true); // Imposta lo stato di caricamento su true
        axios.post("http://localhost:8888/Programmazione%20Web/paletteAPI/getPaletteDashboard.php", {
                creating_user_id: creating_user_id.id_utente,
            })
            .then((response) => {
                /* console.log("Risposta dal backend:", response.data); */
                if (Array.isArray(response.data)) {
                    setCards(response.data); // Aggiorna lo stato delle carte con i dati ricevuti dal backend solo se sono un array
                    /* console.log(response.data); */
                } else {
                    setError("Dati non validi dal backend.");
                }
                setLoading(false); // Imposta lo stato di caricamento su false una volta che i dati sono stati ricevuti
            })
            .catch((error) => {
                console.error(error);
                setError("Errore nell'aggiornamento delle palette.");
                setLoading(false); // Imposta lo stato di caricamento su false in caso di errore
            });
    }, []);

    /* Eliminazione palette */
    /* const handleDeletePalette = (id) => {
        console.log(id);
        axios.delete(`http://localhost:8888/Programmazione%20Web/paletteAPI/deletePalette.php?id=${id}`)
          .then(response => {
            // Aggiorna lo stato dei colori eliminando la palette dallo stato
            // o ricarica le palette dal backend
          })
          .catch(error => {
            console.error('Errore durante l\'eliminazione della palette:', error);
            // Gestisci l'errore
          });
      }; */
    
    // Gestore dell'evento per il pulsante "Load More"
    const handleLoadMore = () => {
        setVisibleCards(prevVisibleCards => prevVisibleCards + 8); // Aggiunge 4 alle palette da visualizzare
    };

    return (
        <>
                <Row>
                    {cards.slice(0, visibleCards).map((colors, index) => (
                        <Col lg={3} md={6} xs={12} key={index}>
                            <CardColor colors={colors} />
                            {/* <button onClick={() => handleDeletePalette(colors.id)}>Elimina</button> */}
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
        </>
    );
}

export default MyPaletteDashboard;

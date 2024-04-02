import React, { useEffect, useState } from 'react';
import { Row, Col, Button, Modal } from 'react-bootstrap';
import axios from 'axios';
import CardColor from './CardColor';
import './style.css';

function MyPaletteDashboard() {
    const [cards, setCards] = useState([]);
    const [visibleCards, setVisibleCards] = useState(12);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [deletingPaletteId, setDeletingPaletteId] = useState(null); // ID della palette da eliminare
    const creating_user_id = JSON.parse(sessionStorage.getItem("userData"));

    // Modal
    const [showModal, setShowModal] = useState(false);

    const handleShowModal = (id) => {
        setDeletingPaletteId(id);
        setShowModal(true);
    };
    
    const handleCloseModal = () => {
        setDeletingPaletteId(null);
        setShowModal(false);
    };

    useEffect(() => {
        setLoading(true);
        axios.post("http://195.231.81.82/paletteIT/paletteAPI/getPaletteDashboard.php", {
                creating_user_id: creating_user_id.id_utente,
            })
            .then((response) => {
                if (Array.isArray(response.data)) {
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

    const handleDeletePalette = () => {
        if (deletingPaletteId) {
            axios.delete(`http://195.231.81.82/paletteIT/paletteAPI/deletePalette.php?id=${deletingPaletteId}`)
              .then(response => {
                // Rimuovi la palette dallo stato locale
                setCards(prevCards => prevCards.filter(card => card.id_palette !== deletingPaletteId));
                handleCloseModal(); // Chiudi il modal dopo l'eliminazione
              })
              .catch(error => {
                console.error('Errore durante l\'eliminazione della palette:', error);
                // Gestisci l'errore
              });
        }
    };

    const handleLoadMore = () => {
        setVisibleCards(prevVisibleCards => prevVisibleCards + 8);
    };

    return (
        <>
            <Row>
                {cards.slice(0, visibleCards).map((colors, index) => (
                    <Col lg={3} md={6} xs={12} key={index}>
                        <CardColor colors={colors} />
                        <Button className='bottone_elimina_palette float-start' variant="danger" size='sm' onClick={() => handleShowModal(colors.id_palette)}>Elimina</Button>
                        {/* <span style={{ color: 'white' }}>ID: {colors.id_palette}</span> */}
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

            {/* Modal di conferma per eliminazione palette */}
            <Modal show={showModal} onHide={handleCloseModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Conferma eliminazione</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Sei sicuro di voler eliminare questa palette?
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="danger" onClick={handleCloseModal}>
                        Annulla
                    </Button>
                    <Button variant="success" onClick={handleDeletePalette}>
                        Conferma
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default MyPaletteDashboard;

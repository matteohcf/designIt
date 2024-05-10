import React, { useState, useEffect } from "react";
import { Button, Modal } from "react-bootstrap";
import axios from "axios";
import "./style.css";

function CardColorDashboard(props) {
  const [likes, setLikes] = useState(props.colors.likes);
  const [error, setError] = useState(null);
  const [likedPalette, setLikedPalette] = useState([]);
  const [savedPalette, setSavedPalette] = useState([]);
  const [fill, setFill] = useState("white");
  const [fillSave, setFillSave] = useState("white");
  const [showModal, setShowModal] = useState(false); /* Modal */
  const [deletingPaletteId, setDeletingPaletteId] =
    useState(null); /* ID della palette da eliminare */

  // Ottieni l'ID utente dal localStorage
  const id_utente_display = localStorage.getItem("id_utente")
    ? localStorage.getItem("id_utente")
    : "/";
  const token = localStorage.getItem("token");

  const handleShowModal = (id) => {
    setDeletingPaletteId(id);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setDeletingPaletteId(null);
    setShowModal(false);
  };

  /* Like alla palette */
  const handleLikeClick = () => {
    const id_palette = parseInt(props.colors.id_palette);

    if (id_utente_display === "/") {
      console.log("Utente non loggato, non può mettere like!");
    } else {
      axios
        .post(
          "http://localhost:8888/Programmazione%20Web/paletteAPI/addLike.php",
          {
            id_palette: id_palette,
            id_utente: id_utente_display,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`, // Includi il token nell'header dell'autorizzazione
            },
          }
        )
        .then((response) => {
          const newLikes = response.data.likes;
          /* console.log(response.data); */
          if (response.data.isLiked) {
            setLikes(newLikes);
            setFill("red");
          } else {
            setFill("white");
            setLikes(newLikes);
          }
          setError(null);
        })
        .catch((error) => {
          console.error(error);
          setError("Errore nell'aggiornamento dei like.");
        });
    }
  };

  /* Salva la palette */
  const handleSavePalette = () => {
    const id_palette = parseInt(props.colors.id_palette);

    if (id_utente_display === "/") {
      console.log("Utente non loggato, non può salvare la palette!");
    } else {
      axios
        .post(
          "http://localhost:8888/Programmazione%20Web/paletteAPI/savePalette.php",
          {
            id_palette: id_palette,
            id_utente: id_utente_display,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`, // Includi il token nell'header dell'autorizzazione
            },
          }
        )
        .then((response) => {
          /* console.log(response.data); */
          if (response.data.isSaved) {
            setFillSave("yellow");
          } else {
            setFillSave("white");
          }
          setError(null);
        })
        .catch((error) => {
          console.error(error);
          setError("Errore nell'aggiornamento dei like.");
        });
    }
  };

  /* Set palette liked */
  useEffect(() => {
    setFill(props.colors.isLiked ? "red" : "white");
  }, [props.colors.isLiked]);

  /* Set palette saved */
  useEffect(() => {
    setFillSave(props.colors.isSaved ? "yellow" : "white");
  }, [props.colors.isSaved]);

  /* Delete palette */
  const handleDeletePalette = () => {
    if (deletingPaletteId && id_utente_display) {
      axios
        .delete(
          `http://localhost:8888/Programmazione%20Web/paletteAPI/deletePalette.php?paletteId=${deletingPaletteId}&userId=${id_utente_display}`,
          {
            headers: {
              Authorization: `Bearer ${token}`, // Includi il token nell'header dell'autorizzazione
            },
          }
        )
        .then((response) => {
          /* console.log(response); */
          handleCloseModal();
          window.location.reload();
        })
        .catch((error) => {
          console.error("Errore durante l'eliminazione della palette:", error);
        });
    }
  };

  return (
    <>
      <div className="card-colors">
        <div
          className="bottone-delete position-absolute top-0 end-0"
          onClick={() => handleShowModal(props.colors.id_palette)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            fill="white"
            className="bi bi-x-lg"
            viewBox="0 0 16 16"
          >
            <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8z" />
          </svg>
        </div>
        <div
          className="div-color first"
          style={{ backgroundColor: props.colors.color1 }}
        >
          {" "}
          <span className="first_span_text"> {props.colors.color1} </span>{" "}
        </div>
        <div
          className="div-color"
          style={{ backgroundColor: props.colors.color2 }}
        >
          {" "}
          <span className="span_text"> {props.colors.color2} </span>{" "}
        </div>
        <div
          className="div-color"
          style={{ backgroundColor: props.colors.color3 }}
        >
          {" "}
          <span className="span_text"> {props.colors.color3} </span>{" "}
        </div>
        <div
          className="div-color last"
          style={{ backgroundColor: props.colors.color4 }}
        >
          {" "}
          <span className="span_text"> {props.colors.color4} </span>{" "}
        </div>
      </div>
      <div className="bottoni">
        <div className="bottone-like bottone-cuore" onClick={handleLikeClick}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            fill={fill}
            className="bi bi-heart-fill"
            viewBox="0 0 16 16"
          >
            <path
              fillRule="evenodd"
              d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314"
            />
          </svg>{" "}
          {}
          <span className="numero-like">{likes}</span>
          {/* <span>{props.colors.id_palette}</span> */}
        </div>
        <div className="bottone-save" onClick={handleSavePalette}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            fill={fillSave}
            className="bi bi-bookmark-fill"
            viewBox="0 0 16 16"
          >
            <path d="M2 2v13.5a.5.5 0 0 0 .74.439L8 13.069l5.26 2.87A.5.5 0 0 0 14 15.5V2a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2" />
          </svg>
        </div>
        {error && <p>{error}</p>}
      </div>

      {/* Modal di conferma per eliminazione palette */}
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Conferma eliminazione</Modal.Title>
        </Modal.Header>
        <Modal.Body>Sei sicuro di voler eliminare questa palette?</Modal.Body>
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

export default CardColorDashboard;

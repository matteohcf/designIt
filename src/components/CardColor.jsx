import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { logout } from "../features/Auth/LoggedIn";
import { useNavigate } from "react-router-dom";
import { useDoubleTap } from "use-double-tap";
import axios from "axios";
import "./style.css";

function CardColor(props) {
  const apiUrl = process.env.REACT_APP_API_URL;
  const [likes, setLikes] = useState(props.colors.likes);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const [copied, setCopied] = useState({
    color1: false,
    color2: false,
    color3: false,
    color4: false,
  });
  const [fill, setFill] = useState("white");
  const [fillSave, setFillSave] = useState("white");

  // Ottieni l'ID utente dal localStorage
  const id_utente_display = localStorage.getItem("id_utente")
    ? localStorage.getItem("id_utente")
    : "/";
  const token = localStorage.getItem("token");

  /* Like alla palette */
  const handleLikeClick = () => {
    const id_palette = parseInt(props.colors.id_palette);

    // Recupera il token JWT da localStorage
    const token = localStorage.getItem("token");

    if (!token) {
      console.log("Utente non loggato, non può mettere like!");
    } else {
      /* console.log(token); */
      axios
        .post(
          `${apiUrl}/addLike.php`,
          {
            id_palette: id_palette,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`, // Includi il token nell'header dell'autorizzazione
            },
          }
        )
        .then((response) => {
          const newLikes = response.data.likes;
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
          if (error.response && error.response.status === 401) {
            console.log("Errore 401: Accesso non autorizzato o token scaduto");
            setError("Errore 401: Accesso non autorizzato o token scaduto");
            dispatch(logout());
            navigate("/login");
          } else {
            console.error(error);
            setError("Errore nell'aggiornamento dei like.");
          }
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
          `${apiUrl}/savePalette.php`,
          {
            id_palette: id_palette,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`, // Includi il token nell'header dell'autorizzazione
            },
          }
        )
        .then((response) => {
          if (response.data.isSaved) {
            setFillSave("yellow");
          } else {
            setFillSave("white");
          }
          setError(null);
        })
        .catch((error) => {
          if (error.response && error.response.status === 401) {
            console.log("Errore 401: Accesso non autorizzato o token scaduto");
            setError("Errore 401: Accesso non autorizzato o token scaduto");
            dispatch(logout());
            navigate("/login");
          } else {
            console.error(error);
            setError("Errore nell'aggiornamento dei like.");
          }
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

  /* Per copiare il codice palette */
  const copyToClipboard = (color, colorName) => {
    navigator.clipboard.writeText(color);
    setCopied({ ...copied, [colorName]: true });
    // Imposta il colore corrente come non copiato dopo 2 secondi solo se è stato precedentemente copiato
    setTimeout(() => {
      setCopied((prevCopied) => ({ ...prevCopied, [colorName]: false }));
    }, 2000);
  };

  /* Double tap funzionante anche su mobile */
  const doubleTap = useDoubleTap((event) => {
    handleLikeClick();
    /* console.log('Double tapped'); */
  });

  return (
    <>
      <div className="card-colors" {...doubleTap}>
        <div
          className="div-color first"
          style={{ backgroundColor: props.colors.color1 }}
        >
          <span
            className="first_span_text"
            onClick={() => copyToClipboard(props.colors.color1, "color1")}
          >
            {copied.color1 ? "Copiato!" : props.colors.color1}
          </span>
        </div>
        <div
          className="div-color"
          style={{ backgroundColor: props.colors.color2 }}
        >
          <span
            className="span_text"
            onClick={() => copyToClipboard(props.colors.color2, "color2")}
          >
            {copied.color2 ? "Copiato!" : props.colors.color2}
          </span>
        </div>
        <div
          className="div-color"
          style={{ backgroundColor: props.colors.color3 }}
        >
          <span
            className="span_text"
            onClick={() => copyToClipboard(props.colors.color3, "color3")}
          >
            {copied.color3 ? "Copiato!" : props.colors.color3}
          </span>
        </div>
        <div
          className="div-color last"
          style={{ backgroundColor: props.colors.color4 }}
        >
          <span
            className="span_text"
            onClick={() => copyToClipboard(props.colors.color4, "color4")}
          >
            {copied.color4 ? "Copiato!" : props.colors.color4}
          </span>
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
          </svg>
          <span className="numero-like">{likes}</span>
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
        {/* {error && <p>{error}</p>} */}
      </div>
    </>
  );
}

export default CardColor;

import React, { useState, useEffect } from 'react';
import axios from "axios";
import './style.css';

function CardColor(props) {
    const [likes, setLikes] = useState(props.colors.likes);
    const [error, setError] = useState(null);
    const [likedPalette, setLikedPalette] = useState([]);
    const [savedPalette, setSavedPalette] = useState([]);
    const [fill, setFill] = useState("white");
    const [fillSave, setFillSave] = useState("white");

    // Ottieni l'ID utente dal sessionStorage
    const id_utente_display = sessionStorage.getItem("userData") ? JSON.parse(sessionStorage.getItem("userData")).id_utente : "/";

    /* Like alla palette */
    const handleLikeClick = () => {
        const id_palette = parseInt(props.colors.id_palette);
        
        if (id_utente_display === "/") {
            console.log("Utente non loggato, non può mettere like!");
        } else {
            axios.post("https://matteocarrara.it/api/paletteAPI/addLike.php",  {
                id_palette: id_palette,
                id_utente: id_utente_display,
            })
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
            axios.post("https://matteocarrara.it/api/paletteAPI/savePalette.php",  {
                id_palette: id_palette,
                id_utente: id_utente_display,
            })
            .then((response) => {
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
    
    /* Ottieni le palette a cui l'utente ha messo like */
    useEffect(() => {
        axios.post("https://matteocarrara.it/api/paletteAPI/getLikedPalette.php", {
            id_utente: id_utente_display,
        })
        .then((response) => {
            setLikedPalette(response.data.liked_palettes);
        })
        .catch((error) => {
            console.error(error);
            setError("Errore nell'aggiornamento dei like.");
        });
    }, [id_utente_display]);

    useEffect(() => {
        // Verifica se l'ID della palette è presente in likedPalette e imposta il colore del cuore di conseguenza
        setFill(Array.isArray(likedPalette) && likedPalette.includes(props.colors.id_palette) ? "red" : "white");
    }, [likedPalette, props.colors.id_palette]);

    /* Ottieni le palette che l'utente ha salvato */
    useEffect(() => {
        axios.post("https://matteocarrara.it/api/paletteAPI/getSavedPalette.php", {
            id_utente: id_utente_display,
        })
        .then((response) => {
            setSavedPalette(response.data.saved_palettes);
        })
        .catch((error) => {
            console.error(error);
            setError("Errore nell'aggiornamento dei save.");
        });
    }, [id_utente_display]);

    useEffect(() => {
        // Verifica se l'ID della palette è presente in savedPalette e imposta il colore del cuore di conseguenza
        setFillSave(Array.isArray(savedPalette) && savedPalette.includes(props.colors.id_palette) ? "yellow" : "white");
    }, [savedPalette, props.colors.id_palette]);
  
    return (
        <>
            <div className="card-colors">
                <div className="div-color first" style={{ backgroundColor: props.colors.color1 }}> <span className='first_span_text'> {props.colors.color1} </span> </div>
                <div className="div-color" style={{ backgroundColor: props.colors.color2 }}> <span className='span_text'> {props.colors.color2} </span> </div>
                <div className="div-color" style={{ backgroundColor: props.colors.color3 }}> <span className='span_text'> {props.colors.color3} </span> </div>
                <div className="div-color last" style={{ backgroundColor: props.colors.color4 }}> <span className='span_text'> {props.colors.color4} </span> </div>
            </div>
            <div className="bottoni">
                <div className='bottone-like bottone-cuore' onClick={handleLikeClick}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20"  fill={fill}  className="bi bi-heart-fill" viewBox="0 0 16 16">
                        <path fillRule="evenodd" d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314" />
                    </svg> { }
                    <span className='numero-like'>{likes}</span>
                    {/* <span>{props.colors.id_palette}</span> */}
                </div>
                <div className="bottone-save" onClick={handleSavePalette}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill={fillSave} className="bi bi-bookmark-fill" viewBox="0 0 16 16">
                        <path d="M2 2v13.5a.5.5 0 0 0 .74.439L8 13.069l5.26 2.87A.5.5 0 0 0 14 15.5V2a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2"/>
                    </svg>
                </div>
                {error && <p>{error}</p>}
            </div>
        </>
    );
}

export default CardColor;

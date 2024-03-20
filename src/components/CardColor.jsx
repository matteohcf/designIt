import React, { useState, useEffect } from 'react';
import axios from "axios";
import './style.css';

function CardColor(props) {
    const [likes, setLikes] = useState(props.colors.likes);
    const [error, setError] = useState(null);
    const [likedPalette, setLikedPalette] = useState([]);
    const [fill, setFill] = useState("white");

    // Ottieni l'ID utente dal sessionStorage
    const id_utente_display = sessionStorage.getItem("userData") ? JSON.parse(sessionStorage.getItem("userData")).id_utente : "/";

    const handleLikeClick = () => {
        const id_palette = parseInt(props.colors.id_palette);
        
        if (id_utente_display === "/") {
            console.log("Utente non loggato, non può mettere like!");
        } else {
            axios.post("http://localhost:8888/Programmazione%20Web/paletteAPI/addLike.php", {
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
    
    useEffect(() => {
        axios.post("http://localhost:8888/Programmazione%20Web/paletteAPI/getLikedPalette.php", {
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
  
    return (
        <>
            <div className="card-colors">
                <div className="div-color first" style={{ backgroundColor: props.colors.color1 }}> <span className='first_span_text'> {props.colors.color1} </span> </div>
                <div className="div-color" style={{ backgroundColor: props.colors.color2 }}> <span className='span_text'> {props.colors.color2} </span> </div>
                <div className="div-color" style={{ backgroundColor: props.colors.color3 }}> <span className='span_text'> {props.colors.color3} </span> </div>
                <div className="div-color last" style={{ backgroundColor: props.colors.color4 }}> <span className='span_text'> {props.colors.color4} </span> </div>
            </div>
            <div className='bottone-like bottone-cuore' onClick={handleLikeClick}>
                
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20"  fill={fill}  className="bi bi-heart-fill" viewBox="0 0 16 16">
                    <path fillRule="evenodd" d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314" />
                </svg> { }
                <span className='numero-like'>{likes}</span>
                {/* <span>{props.colors.id_palette}</span> */}
            </div>
            {error && <p>{error}</p>}
        </>
    );
}

export default CardColor;

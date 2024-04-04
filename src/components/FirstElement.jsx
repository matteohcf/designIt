/* import './FirstElement.css'; */
import { Container } from 'react-bootstrap';
import { useEffect } from 'react';
/* import CardColor from './CardColor'; */
import axios from "axios";
import React, { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import './style.css';

// Import Swiper styles
import 'swiper/css';
import 'swiper/swiper-bundle.css';
import CardColorHomePage from './CardColorHomePage';

function FirstElement () {
    
    const [cards, setCards] = useState([]);
    const [loading, setLoading] = useState(false);

    // Effettua la richiesta delle palette dal DB
useEffect(() => {
    setLoading(true); // Imposta lo stato di caricamento su true
    axios.get('https://matteocarrara.it/api/paletteAPI/getPalette.php')
        .then(response => {
            // Seleziona casualmente 10 elementi dall'array response.data
            const randomCards = response.data.sort(() => 0.5 - Math.random()).slice(0, 10);
            setCards(randomCards);
            /* console.log(randomCards); */
            setLoading(false); // Imposta lo stato di caricamento su false
        })
        .catch(error => {
            console.error('Errore nella richiesta al database:', error);
            setLoading(false); // Imposta lo stato di caricamento su false in caso di errore
        });
}, []);

    return (
        <>
        <Container className="mt-5">
            <div className="titolo_principale">
                <span className='titolo_principale_background'>Palette it!</span>
            </div>
            <div className='titolo_principale_sottotitolo_div'>
                <span className='titolo_principale_sottotitolo'>Next Generation Palette Tool</span>
            </div>
            <div className='sottotitolo_principale_home_div'>
                <span className='sottotitolo_principale_home'>Esplora e crea palette di colori uniche per i tuoi progetti di design su un sito web interattivo!</span>
            </div>
            <Swiper className='swiper_class'
                /* spaceBetween={0} */
                spaceBetween={window.innerWidth > 768 ? 30 : 10} /* Responsive */
                slidesPerView={window.innerWidth > 768 ? 4 : 2} /* Responsive */
                /* slidesPerView={4} */
                loop={true} // Opzionale: abilita il looping delle slide
                /* onSlideChange={() => console.log('slide change')}
                onSwiper={(swiper) => console.log(swiper)} */
            >
            {cards.map((colors, index)=>  <SwiperSlide key={index}> <CardColorHomePage colors={colors}  /> </SwiperSlide> )} 
            </Swiper>
        </Container>
        </>
    );
}

export default FirstElement;
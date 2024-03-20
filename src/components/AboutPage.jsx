import './style.css';
import { Container } from 'react-bootstrap';

function AboutPage () {
    return (
        <>
            <Container className="mt-5">
            <div className="titolo_principale">
                <span className='titolo_principale_background'>About us</span>
            </div>
            <div className='titolo_principale_sottotitolo_div'>
                <span className='titolo_principale_sottotitolo'>Palette it!</span>
            </div>
            <div className='sottotitolo_principale_home_div mt-5'>
                <span className='sottotitolo_principale_home'>Benvenuto, siamo una piattaforma dedicata alla creazione e condivisione di palette di colori.</span>
                <p className='sottotitolo_principale_home mt-1'>Registrati gratuitamente, carica le tue palette e unisciti alla nostra community creativa!</p>
            </div>
        </Container>
        </>
    );
}

export default AboutPage;
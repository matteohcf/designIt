import { Container, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

function NoMatchPage () {
    return (
        <>
            <Container className="mt-5">
            <div className="titolo_principale">
                <span className='titolo_principale_background'>Pagina non trovata</span>
            </div>
            <div className='sottotitolo_principale_home_div'>
                <span className='sottotitolo_principale_home'>Sembra che la pagina che hai digitato non esista, premi qui sotto per tornare alla home page</span>
            </div>
            <Button className="mt-3" variant="outline-light" size="lg"><Link to="/">Home</Link></Button>
            </Container>
        </>
    );
}

export default NoMatchPage;
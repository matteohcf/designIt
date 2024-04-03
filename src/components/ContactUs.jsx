import { Row, Col } from 'react-bootstrap';

function Contatti() {
    return (
        <Row>
            <Col md={6} className="mt-3 cointainer_principale_about">
                <span className="titolo_contatti titolo_principale_background">Contattaci</span>
                <p className="sottotitolo_contatti">Qui sotto trovi tutte le informazioni per contattarci</p>
                <div className='info_contatti'>
                    <div><span className='titolo_principale_background' style={{ fontSize: '16px' }}> Email: </span> <span style={{ color: 'white' }}>matteo.carrara.teo@gmail.com</span></div>
                    <div><span className='titolo_principale_background' style={{ fontSize: '16px' }}> Telefono: </span> <span style={{ color: 'white' }}>+39 333333333</span></div>
                </div>
            </Col>
            <Col md={6} className="mt-3 informazioni_sotto">
                <span className="titolo_contatti titolo_principale_background">Informazioni</span>
                <p className="sottotitolo_contatti">Qui sotto trovi altre informazioni generali</p>
                <div className='info_contatti'>
                    <div><span className='titolo_principale_background' style={{ fontSize: '16px' }}> Email: </span> <span style={{ color: 'white' }}>matteo.carrara.teo@gmail.com</span></div>
                    <div><span className='titolo_principale_background' style={{ fontSize: '16px' }}> Email: </span> <span style={{ color: 'white' }}>matteo.carrara.teo@gmail.com</span></div>
                </div>
            </Col>
        </Row>
    );
}

export default Contatti;

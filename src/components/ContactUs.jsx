import { Row, Col } from 'react-bootstrap';

function Contatti() {
    return (
        <Row>
            <Col md={6} className="mt-3 cointainer_principale_about">
                <span className="titolo_contatti titolo_principale_background">Contattaci</span>
                <p className="sottotitolo_contatti">Di seguito puoi trovare tutte le informazioni per contattarci</p>
                <div className='info_contatti'>
                    <div><span className='titolo_principale_background' style={{ fontSize: '16px' }}> Email: </span> <span style={{ color: 'white' }}>palette@matteocarrara.it</span></div>
                    <div><span className='titolo_principale_background' style={{ fontSize: '16px' }}> Portfolio: </span> <a href='https://matteocarrara.it' className='link_portfolio' target='_blank' rel="noreferrer">matteocarrara.it</a></div>
                </div>
            </Col>
            <Col md={6} className="mt-3 informazioni_sotto">
                <span className="titolo_contatti titolo_principale_background">Informazioni</span>
                <p className="sottotitolo_contatti">Di seguito puoi trovare altre informazioni generali</p>
                <div className='info_contatti'>
                    <div><span className='titolo_principale_background' style={{ fontSize: '16px' }}> App IOS: </span> <span style={{ color: 'white' }}>Scarica l'app per IOS</span></div>
                    <div><span className='titolo_principale_background' style={{ fontSize: '16px' }}> App Android: </span> <span style={{ color: 'white' }}>Scarica l'app per Android</span></div>
                </div>
            </Col>
        </Row>
    );
}

export default Contatti;

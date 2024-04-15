import { Row, Col } from 'react-bootstrap';

function Contatti() {
    return (
        <Row>
            <Col lg={6} md={12} xs={12} className="mt-3 cointainer_principale_about">
                <span className="titolo_contatti titolo_principale_background">Contattaci</span>
                <p className="sottotitolo_contatti">Di seguito puoi trovare tutte le informazioni per contattarci</p>
                <div className='info_contatti'>
                    <div><span className='titolo_principale_background' style={{ fontSize: '16px' }}> Email: </span> <a href='mailto:palette@matteocarrara.it' className='link_portfolio'>palette@matteocarrara.it</a></div>
                    <div><span className='titolo_principale_background' style={{ fontSize: '16px' }}> Portfolio: </span> <a href='https://matteocarrara.it' className='link_portfolio' target='_blank' rel="noreferrer">matteocarrara.it</a></div>
                </div>
            </Col>
            <Col lg={6} md={12} xs={12} className="mt-3 informazioni_sotto">
                <span className="titolo_contatti titolo_principale_background">Informazioni</span>
                <p className="sottotitolo_contatti">Di seguito puoi trovare le app scaricabili</p>
                <div className='info_contatti'>
                    <div><span className='titolo_principale_background' style={{ fontSize: '16px' }}> App IOS: </span> <span style={{ color: 'white' }}>Scarica l'app per IOS</span></div>
                    <div><span className='titolo_principale_background' style={{ fontSize: '16px' }}> App Android: </span> <span style={{ color: 'white' }}>Scarica l'app per Android</span></div>
                </div>
            </Col>
        </Row>
    );
}

export default Contatti;

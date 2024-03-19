/* import './DashboardPage.css'; */
import { Container } from "react-bootstrap";
import PaletteCard from './PaletteCard';
import MyPaletteDashboard from './MyPaletteDashboard';
import './style.css';

function DashboardPage() {
    const username = JSON.parse(sessionStorage.getItem("userData")); /* Per estrapolare le informazioni dell'utente */
    /* console.log(username.username); */

    return (
        <>
        <Container className="mt-5">
            <div className="titolo_principale">
                Benvenuto <span className="titolo_principale_background">{username.username}</span>
            </div>
            <div className='sottotitolo_principale_home_div_palette'>
                <span className="sottotitolo_principale_home">Benvenuto, questa è la dashboard del tuo account, qui puoi creare e pubblicare le palette di colori!</span>
            </div>
            <div className='mt-3'>
                <PaletteCard/>
            </div>
            <div className='mt-5 cointainer_principale'>
                <div className='palette_pubblicate'>
                    <span className="titolo_principale_background">Palette pubblicate:</span>
                </div>
                <div className='sottotitolo_principale_home_div_palette'>
                    <span className="sottotitolo_principale_home">Qui sotto puoi visualizzare le palette che hai pubblicato ed i loro like!</span>
                </div>
                <div>
                    <MyPaletteDashboard/>
                </div>
            </div>
        </Container>
        </>
    );
}

export default DashboardPage;

/* import './Footer.css'; */
import './style.css';

function Footer () {
    return (
        <footer className="page-footer font-small pt-4 mt-5">
            <div className="container-fluid text-center text-md-left">
                <div className="row">
                    <div className="col-md-6 mt-md-0 mt-3">
                        <h5 className="text-uppercase">Design it - Palette</h5>
                        <p>Benvenuto nel mio sito di design, qui potrai trovare milioni di palette</p>
                    </div>

                    <hr className="clearfix w-100 d-md-none pb-0"/>

                    <div className="col-md-3 mb-md-0 mb-3">
                        <h5 className="text-uppercase">Links</h5>
                        <ul className="list-unstyled">
                            <li><a href="http://matteocarrara.it">Sito web personale</a></li>
                            {/* <li><a href="#!">Link 2</a></li>
                            <li><a href="#!">Link 3</a></li>
                            <li><a href="#!">Link 4</a></li> */}
                        </ul>
                    </div>

                    <div className="col-md-3 mb-md-0 mb-3">
                        <h5 className="text-uppercase">informazioni</h5>
                        <ul className="list-unstyled">
                            <li><a href="/about">About</a></li>
                            {/* <li><a href="#!">Link 2</a></li>
                            <li><a href="#!">Link 3</a></li>
                            <li><a href="#!">Link 4</a></li> */}
                        </ul>
                    </div>
                </div>
            </div>

            <div className="footer-copyright text-center py-3">© 2024 Copyright:
                <a href="http://matteocarrara.it"> matteocarrara.it</a>
            </div>
        </footer>
    );
}

export default Footer;
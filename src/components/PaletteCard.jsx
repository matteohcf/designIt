import Form from "react-bootstrap/Form";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { logout } from "../features/Auth/LoggedIn";
import { useNavigate } from "react-router-dom";
import { Button, Modal } from "react-bootstrap";
import axios from "axios";
import "./style.css";

function PaletteCard() {
  const token = localStorage.getItem("token");
  const apiUrl = process.env.REACT_APP_API_URL;
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Modal
  const [showModal, setShowModal] = useState(false);

  const handleShowModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

  const [color1, setColor1] = useState("#008DDA");
  const handleColor1Change = (event) => {
    setColor1(event.target.value);
  };

  const [color2, setColor2] = useState("#41C9E2");
  const handleColor2Change = (event) => {
    setColor2(event.target.value);
  };

  const [color3, setColor3] = useState("#ACE2E1");
  const handleColor3Change = (event) => {
    setColor3(event.target.value);
  };

  const [color4, setColor4] = useState("#F7EEDD");
  const handleColor4Change = (event) => {
    setColor4(event.target.value);
  };

  const [apiResponse, setApiResponse] = useState(""); /* Per API response */

  /* Creazione palette in DB */
  const creaPalette = () => {
    axios
      .post(
        `${apiUrl}/creaPalette.php`,
        {
          color1: color1,
          color2: color2,
          color3: color3,
          color4: color4,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`, // Includi il token nell'header dell'autorizzazione
          },
        }
      )
      .then((response) => {
        /* console.log(response); */
        setApiResponse(response.message);
        handleCloseModal();
        window.location.reload();
      })
      .catch((error) => {
        if (error.response && error.response.status === 401) {
            console.log("Errore 401: Accesso non autorizzato o token scaduto");
            setApiResponse("Errore 401: Accesso non autorizzato o token scaduto");
            dispatch(logout());
            navigate('/login');
          } else {
            console.error(error);
            setApiResponse("Errore nell'aggiornamento dei like.");
          }
      });
  };

  return (
    <>
      <div className="card-colors">
        <div className="div-color first" style={{ backgroundColor: color1 }}>
          {" "}
          <span className="first_span_text"> {color1} </span>
          <span className="float-end">
            <Form.Control
              type="color"
              id="exampleColorInput"
              defaultValue={color1}
              onChange={handleColor1Change}
            />
          </span>{" "}
        </div>
        <div className="div-color" style={{ backgroundColor: color2 }}>
          {" "}
          <span className="span_text"> {color2} </span>
          <span className="float-end">
            <Form.Control
              type="color"
              id="exampleColorInput"
              defaultValue={color2}
              onChange={handleColor2Change}
            />
          </span>{" "}
        </div>
        <div className="div-color" style={{ backgroundColor: color3 }}>
          {" "}
          <span className="span_text"> {color3} </span>
          <span className="float-end">
            <Form.Control
              type="color"
              id="exampleColorInput"
              defaultValue={color3}
              onChange={handleColor3Change}
            />
          </span>{" "}
        </div>
        <div className="div-color last" style={{ backgroundColor: color4 }}>
          {" "}
          <span className="span_text"> {color4} </span>
          <span className="float-end">
            <Form.Control
              type="color"
              id="exampleColorInput"
              defaultValue={color4}
              onChange={handleColor4Change}
            />
          </span>{" "}
        </div>
      </div>
      <Button
        variant="light"
        className="mt-3 bottone_pubblica"
        onClick={handleShowModal}
      >
        Pubblica
      </Button>

      {/* Modal di conferma */}
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Conferma pubblicazione</Modal.Title>
        </Modal.Header>
        <Modal.Body>Sei sicuro di voler pubblicare questa palette?</Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={handleCloseModal}>
            Annulla
          </Button>
          <Button variant="success" onClick={creaPalette}>
            Conferma
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default PaletteCard;

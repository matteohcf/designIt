import React, { useState, useEffect } from 'react';
import './style.css';

function CardColorHomePage(props) {
    return (
        <>
            <div className="card-colors">
                <div className="div-color first" style={{ backgroundColor: props.colors.color1 }}> <span className='first_span_text'> {props.colors.color1} </span> </div>
                <div className="div-color" style={{ backgroundColor: props.colors.color2 }}> <span className='span_text'> {props.colors.color2} </span> </div>
                <div className="div-color" style={{ backgroundColor: props.colors.color3 }}> <span className='span_text'> {props.colors.color3} </span> </div>
                <div className="div-color last" style={{ backgroundColor: props.colors.color4 }}> <span className='span_text'> {props.colors.color4} </span> </div>
            </div>
        </>
    );
}

export default CardColorHomePage;

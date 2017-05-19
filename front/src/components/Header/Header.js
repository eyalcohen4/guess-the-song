import React from 'react';

import './Header.css';


export default function Header(props) {
    return (
        <header> 
            <div className="Header__BG"></div>
            <h1 className="Header__Title"> לא נפסיק לשיר </h1>
            <h2 className="Header__Level-Number"> {props.levelNumber} </h2>
        </header>
    )
}
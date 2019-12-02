import React from 'react';

import {NavLink} from "react-router-dom";

import "./Menu.css";

function Menu() {

    return (
        <header className="Menu">
            <img src={"logo.svg"} className="App-logo" alt="logo"/>
            <nav>
                <NavLink exact={true} to="/">Accueil</NavLink>
                <NavLink exact={true} to="/post">Nouveau message</NavLink>
            </nav>
        </header>

    );
}

export default Menu;

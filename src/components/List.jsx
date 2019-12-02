import React, {useEffect, useState} from 'react';

import {NavLink} from "react-router-dom";
import Message from "./Message";

async function fetchMessage(callback) {
    const response = await fetch('https://api.larus.fr/pwa/post');
    const json = await response.json();
    callback(json);
}

function List() {
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        let isSubscribed = true;
        fetchMessage((data => isSubscribed && setMessages(data)));
        return () => isSubscribed = false;
    }, []);

    return (
        <div>
            {messages.map(message => (<Message key={message.key} message={message}/>))}
        </div>
    );
}

export default List;

import React, {useEffect, useState} from 'react';
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

    // Appel d'un composant message pour chaque message
    return (
        <div>
            {messages.map(message => (<Message key={message.key} message={message}/>))}
        </div>
    );
}

export default List;

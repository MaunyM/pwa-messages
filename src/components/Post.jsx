import React, {useState} from 'react';

import {withRouter} from "react-router-dom";

import './Post.css';

async function postMessage(data) {
    const res = await fetch('https://api.larus.fr/pwa/post',
        {
            method: 'POST',
            body: JSON.stringify(data)
        }
    );
    return res.json()
}

function Post({history}) {
    const [body, setBody] = useState('');
    const [title, setTitle] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();
        await postMessage({body, title});
        history.push('/')
    };
    return (
        <form onSubmit={handleSubmit} className={"MessageForm"}>
            <label>
                Titre :
                <input className={'Item'} type="text" value={title} onChange={e => setTitle(e.target.value)}/>
            </label>
            <label>
                Message :
                <textarea className={'Item'} value={body} onChange={e => setBody(e.target.value)}/>
            </label>
            <button type="submit">Publier</button>
        </form>
    );
}

export default withRouter(Post);

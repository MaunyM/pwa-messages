import React from 'react';

import './Message.css';

function Message({message}) {
    return (
        <div className={'Message'}>
            <span className={"title"}>{message.title}</span>
            <span className={"body"}>{message.body}</span>
        </div>
    );
}

export default Message;

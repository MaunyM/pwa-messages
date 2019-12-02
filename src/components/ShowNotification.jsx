import React from 'react';

function ShowNotification() {

    const clicked = () => {
        if (Notification.permission === 'granted') {
            navigator.serviceWorker.getRegistration().then(reg => {
                reg.showNotification('Hello !');
            });
        }
    };

    return (
        <div className="ShowNotification" onClick={clicked}> Show Notification
        </div>

    );
}

export default ShowNotification;

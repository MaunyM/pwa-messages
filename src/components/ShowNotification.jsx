import React from 'react';

function ShowNotification() {

    const clicked = () => {
        if (Notification.permission === 'granted') {
            navigator.serviceWorker.getRegistration().then(reg => {
                const options = {
                    body: 'Une notification avec option !',
                    icon: 'logo192.png',
                    vibrate: [100, 50, 100],
                    data: {
                        id: 'NEW_MESSAGE'
                    },
                    actions: [
                        {action: 'Nouveau message', title: 'Publier un nouveau message'},
                    ]
                };
                reg.showNotification('Hello !', options);
            });
        }
    };

    return (
        <div className="ShowNotification" onClick={clicked}> Show Notification
        </div>

    );
}

export default ShowNotification;

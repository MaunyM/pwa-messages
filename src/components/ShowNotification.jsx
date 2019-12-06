import React from 'react';

function ShowNotification() {
    const clicked = () => {
        console.log('notif click');
        Notification.requestPermission().then((permission) => {
            if(permission === 'granted') {
                navigator.serviceWorker.getRegistration().then(reg => {
                    const options = {
                        body: "Nom de la notif",
                        icon: "logo192.png",
                        vibrate: [500, 200, 500],
                        actions: [
                            {action: 'Nouveau message', title: 'Publier un nouveau message'},
                        ]
                    }
                    reg.showNotification('Hello', options);
                })
            }
        });
    }
    return (
        <div onClick={clicked}>
            Test
        </div>
    )
}

export default ShowNotification;
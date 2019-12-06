import React, {useState} from 'react';

import {urlB64ToUint8Array} from "../services/PushService";

function ShowNotification() {

    const [subscription, setSubscription] = useState('');

    const clicked = () => {
        if (Notification.permission === 'granted') {
            navigator.serviceWorker.getRegistration().then(reg => {
                // reg est l'enregistrement du serviceWorker pour lui envoyer des événements
                const options = {
                    body: 'Une notification avec option !',
                    icon: 'logo192.png',
                    vibrate: [50, 50, 50, 50, 20],
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


    const registerClicked = () => {
        navigator.serviceWorker.getRegistration().then( async reg => {
            const subscription = await reg.pushManager.subscribe({
                userVisibleOnly: true,
                applicationServerKey: urlB64ToUint8Array('BLPebNoYfEXxN3_xNaXRpYaK2V64y6Ro7nn3rWUnDEuoaMID7rPposNyeSI6H-u_m_r6FJovOWCXKLBr-AWpdR4')
            });
            console.log('User is subscribed', JSON.stringify(subscription));
            setSubscription(JSON.stringify(subscription));
        });
    };

    return (
        <div>
            <div className="ShowNotification" onClick={clicked}>
                Show Notification
            </div>
            <div onClick={registerClicked}>Register</div>
            {subscription}
        </div>
    );
}

export default ShowNotification;

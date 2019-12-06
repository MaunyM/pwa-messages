import React, {useState} from 'react';
import {urlB64ToUint8Array} from "../services/PushService";

function ShowNotification() {

    const [subscription, setSubcription] = useState('');

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

    const registerCliked = () => {
        navigator.serviceWorker.getRegistration().then(async reg => {
            try {
                const subscription = await reg.pushManager.subscribe({
                    userVisibleOnly: true,
                    applicationServerKey: urlB64ToUint8Array('BGaw0zJZgzIqBZoEnsZuL8k_-RZvK4T0IG2Rl9Msi9fRNu2ekuBJCoaGuVzUeQQlL-v6oNHh6N2nrY0-wz3GyHo')
                });
                console.log('User is subscribed:', JSON.stringify(subscription));
                setSubcription(JSON.stringify(subscription));

            } catch (err) {
                console.error('Failed to subscribe the user: ', err);
            }
        });
    };

    return (
        <div>
            <div className="ShowNotification" onClick={clicked}> Show Notification</div>
            <div onClick={registerCliked}>Register</div>
            {subscription}
        </div>

    );
}

export default ShowNotification;

import React, {useState} from 'react';
import {urlB64ToUint8Array} from '../services/PushService';

function ShowNotification() {

    const [subscription, setSubscription] = useState('');

    const clicked = () => {
        console.log('notif sent');
        Notification.requestPermission().then((permission) => {
            if(permission === 'granted') {
                navigator.serviceWorker.getRegistration().then(reg => {
                    const options = {
                        body: "Nom de la notif",
                        icon: "logo192.png",
                        vibrate: [500, 200, 500],
                        data: {
                            id: "TEST_ID"
                        },
                        actions: [
                            {action: 'Nouveau message', title: 'Publier un nouveau message'},
                        ]
                    }
                    reg.showNotification('Hello', options);
                })
            }
        });
    };

    const registerClicked = () => {
        navigator.serviceWorker.getRegistration().then(async reg => {
            const subscription = await reg.pushManager.subscribe({
                userVisibleOnly: true,
                applicationServerKey: urlB64ToUint8Array('BJto1O0WwceewgPQ3qle8BA2K-VKOedsQc2154m8HZ4-E64uul5S_WIuTV83YSWNdCQj-7oyFm0tSshdzBX1VIU')
            });
            console.log('User subscribed : ', JSON.stringify(subscription));
            setSubscription(JSON.stringify(subscription));
        });
    };

    return (
        <div>
            <div onClick={clicked}>
                Show notif
            </div>
            <div onClick={registerClicked}>
                Register
            </div>
            {subscription}
        </div>
    );
}

export default ShowNotification;
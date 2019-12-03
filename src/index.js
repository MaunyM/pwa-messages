import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import {urlB64ToUint8Array} from "./services/PushService";

ReactDOM.render(<App/>, document.getElementById('root'));

navigator.serviceWorker.register('serviceWorker.js');

Notification.requestPermission().then(status => {
    console.log('Notification permission status:', status);
});

navigator.serviceWorker.getRegistration().then(async reg => {
    try {
        const subscription = await reg.pushManager.subscribe({
            userVisibleOnly: true,
            applicationServerKey: urlB64ToUint8Array('YOUR_PUBLIC_KEY')
        });
        console.log('User is subscribed:', JSON.stringify(subscription));

    } catch (err) {
        if (Notification.permission === 'denied') {
            console.warn('Permission for notifications was denied');
        } else {
            console.error('Failed to subscribe the user: ', err);
        }
    }
});




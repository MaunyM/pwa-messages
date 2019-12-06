import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
// import {urlB64ToUint8Array} from "./services/PushService";

ReactDOM.render(<App/>, document.getElementById('root'));

// navigator.serviceWorker.register('serviceWorker.js');
navigator.serviceWorker.register('serviceWorker.js').then(
    () => {
        console.log('SW load');
    }
);

Notification.requestPermission().then(status => {
    console.log(status);
});


// navigator.serviceWorker.getRegistration().then( async reg => {
//     const subscription = await reg.pushManager.subscribe({
//         userVisibleOnly: true,
//         applicationServerKey: urlB64ToUint8Array('BLPebNoYfEXxN3_xNaXRpYaK2V64y6Ro7nn3rWUnDEuoaMID7rPposNyeSI6H-u_m_r6FJovOWCXKLBr-AWpdR4')
//     });
//     console.log('User is subscribed', JSON.stringify(subscription));
// });
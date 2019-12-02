import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';

ReactDOM.render(<App/>, document.getElementById('root'));

navigator.serviceWorker.register('serviceWorker.js');

Notification.requestPermission().then(status => {
    console.log('Notification permission status:', status);
});




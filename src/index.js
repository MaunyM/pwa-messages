import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';

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

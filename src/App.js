import React from 'react';
import {Switch, Route, BrowserRouter as Router} from 'react-router-dom';

import Menu from './components/Menu';
import List from './components/List';
import Post from './components/Post';
import ShowNotification from './components/ShowNotification';

import './App.css';

function App() {
    return (
        <Router>
            <div className={'App'}>
                <Menu/>
                <ShowNotification/>
                <Switch>
                    <Route path={'/post'}>
                        <Post/>
                    </Route>
                    <Route path={'/'}>
                        <List/>
                    </Route>
                </Switch>
            </div>
        </Router>
    );
}

export default App;

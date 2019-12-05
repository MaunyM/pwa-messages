import React from 'react';
import {Switch, Route, BrowserRouter as Router} from 'react-router-dom';

import Menu from './components/Menu';
import List from './components/List';
import Post from './components/Post';

import './App.css';

function App() {
    return (
        <Router>
            <div className={'App'}>
                <Menu/>
                <Switch>
                    <Route path={'/'}>
                        <List/>
                    </Route>
                    <Route path={'/post'}>
                        <Post/>
                    </Route>
                </Switch>
            </div>
        </Router>
    );
}

export default App;

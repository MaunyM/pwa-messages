import React from 'react';

import {Switch, Route, BrowserRouter as Router} from 'react-router-dom';

import './App.css';
import Menu from "./components/Menu";
import Post from "./components/Post";
import List from "./components/List";

function App() {
    return (
        <Router>
            <div className={'App'}>
                <Menu/>
                <Switch>
                   <Route path={"/post"}>
                       <Post/>
                   </Route>
                   <Route path={"/"}>
                       <List/>
                   </Route>
                </Switch>
            </div>
        </Router>
    );
}

export default App;

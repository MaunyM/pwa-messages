import React from 'react';

import {Switch, Route, BrowserRouter as Router} from 'react-router-dom';

import './App.css';
import Menu from "./components/Menu";
import Post from "./components/Post";
import List from "./components/List";
import ShowNotification from "./components/ShowNotification";

function App() {
    return (
        <Router>
            <div className={'App'}>
                <Menu/>
                <ShowNotification/>
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

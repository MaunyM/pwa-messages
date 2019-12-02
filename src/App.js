import React from 'react';
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";
import Menu from "./components/Menu";

import './App.css';
import List from "./components/List";
import Post from "./components/Post";
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

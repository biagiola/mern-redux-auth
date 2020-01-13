import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Navbar from './components/navbar';
import ExersiceList from './components/exercises-list';
import EditExercise from './components/edit-exercise';
import CreateExercise from './components/create-exercise';
import CreateUser from './components/create-user';

function App() {
  return (
    <div className="App">
        <BrowserRouter>
            <Navbar/>
            <br/>
            <Switch>
                <Route exact path="/" component={ ExersiceList } />
                <Route path="/edit/:id" component={ EditExercise } />
                <Route path="/create" component={ CreateExercise } />
                <Route path="/user" component={ CreateUser } />
            </Switch>
        </BrowserRouter>
    </div>
  );
}

export default App;

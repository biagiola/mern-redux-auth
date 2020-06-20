import React, { Component } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Navbar from './components/navbar';
import ArticlesList from './components/article-list';
import ArticleDetails from './components/article-details';
import CreateArticle from './components/create-article';
import EditArticle from './components/edit-article';
import DeleteArticle from './components/delete-article';
import CreateLenguage from './components/create-lenguage';
import CreateUser from './components/create-user';
import SignUp from './components/sign-up';
import axios from 'axios';

export default class App extends Component {

  componentDidMount(){
    axios.post('http://localhost:5000/auth/register0', )
  }

  render(){
    return (
      <div className="App text-white">
          <BrowserRouter>
              { false && <Navbar/>     }
              <Switch>
                  <Route exact path="/" component={ SignUp } />
                  <Route path="/dashboard" component={ ArticlesList } />
                  <Route path="/details/:id" component={ ArticleDetails } />
                  <Route path="/create" component={ CreateArticle } />
                  <Route path="/edit/:id" component={ EditArticle } />
                  <Route path="/deleted" component={ DeleteArticle } />
                  <Route path="/lenguage" component={ CreateLenguage } />
                  <Route path="/signup" component={ CreateUser } />
              </Switch>
          </BrowserRouter>
      </div>
    );
  }
  
}


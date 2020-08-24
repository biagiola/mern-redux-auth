import React, { Component } from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'

import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css'

import Navbar from './components/navbar'
import Login from './components/login'
import ArticlesList from './components/article-list'
import ArticleDetails from './components/article-details'
import CreateArticle from './components/create-article'
import EditArticle from './components/edit-article'
import DeleteArticle from './components/delete-article'
import CreateLenguage from './components/create-lenguage'
//import CreateUser from './components/create-user'
import Bitcoin from './components/bitcoin-chart'

import {
  CSSTransition,
  TransitionGroup,
} from 'react-transition-group'

export default class App extends Component {

  render(){
    return (
      <div className="App text-white">
          <BrowserRouter>
            <Navbar/>
            <Route render={( { location } ) => (
              <TransitionGroup>
                <CSSTransition
                  in={ true }
                  appear={ true }
                  key={ location.key } 
                  timeout={ 150 }
                  classNames="fade"
                >
                  <Switch location={ location }>
                    <Route exact path="/" component={ Login } />
                    <Route path="/dashboard" component={ ArticlesList } />
                    <Route path="/details/:id" component={ ArticleDetails } />
                    <Route path="/create" component={ CreateArticle } />
                    <Route path="/edit/:id" component={ EditArticle } />
                    <Route path="/deleted" component={ DeleteArticle } />
                    <Route path="/lenguage" component={ CreateLenguage } />
                    <Route path="/bitcoin" component={ Bitcoin } />
                    {/*<Route path="/signup" component={ CreateUser } />*/}
                    <Route path="*" component={ () => "404 not found" } />
                  </Switch>
                  </CSSTransition>
              </TransitionGroup>
            )}/>
          </BrowserRouter>
      </div>
    );
  }
}

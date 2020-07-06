import React, { Component } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types'

import Navbar from './components/navbar';
import ArticlesList from './components/article-list';
import ArticleDetails from './components/article-details';
import CreateArticle from './components/create-article';
import EditArticle from './components/edit-article';
import DeleteArticle from './components/delete-article';
import CreateLenguage from './components/create-lenguage';
import CreateUser from './components/create-user';
import SignUp from './components/sign-up';

class App extends Component {

  render(){
    return (
      <div className="App text-white">
          <BrowserRouter>
              { !this.props.showNavbar && <Navbar/> }
              <Switch>
                <Route path="/dashboard" component={ ArticlesList } />
                <Route exact path="/" component={ SignUp } />
                <Route path="/details/:id" component={ ArticleDetails } />
                <Route path="/create" component={ CreateArticle } />
                <Route path="/edit/:id" component={ EditArticle } />
                <Route path="/deleted" component={ DeleteArticle } />
                <Route path="/lenguage" component={ CreateLenguage } />
                <Route path="/signup" component={ CreateUser } />
                <Route path="*" component={ () => "404 not found" } />
              </Switch>
          </BrowserRouter>
      </div>
    );
  }
  
}

App.propTypes = {
  showNavbar: PropTypes.bool
}

const mapStateToProps = state => ({
  showNavbar: state.casa.switchNavbar
})

export default connect(mapStateToProps, null)(App);
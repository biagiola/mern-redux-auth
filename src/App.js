import React from 'react';
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

function App() {
  return (
    <div className="App text-white">
        <BrowserRouter>
            <Navbar/>
            <main>
                <Switch>
                    <Route exact path="/" component={ ArticlesList } />
                    <Route path="/details/:id" component={ ArticleDetails } />
                    <Route path="/create" component={ CreateArticle } />
                    <Route path="/edit/:id" component={ EditArticle } />
                    <Route path="/deleted" component={ DeleteArticle } />
                    <Route path="/user" component={ CreateLenguage } />
                </Switch>
            </main>
        </BrowserRouter>
    </div>
  );
}

export default App;

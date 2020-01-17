import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

// this props comes from the state, that is map in articleList() 
const Article = props => (
    <tr>
        <td>
            <Link to={ '/details/' + props.article._id }>{ props.article.title }</Link>
        </td>
    </tr>
)

export default class ArticlesList extends Component {
    constructor(props) {
        super(props)
        this.state = {
            articles: []
        };
        
    }
    
    componentDidMount() {
        axios.get( 'http://localhost:5000/exercises/' )
        .then( response => {
            this.setState({ articles: response.data })
        })
        .catch( error => console.log(error) )
    }

    articleList() {
        return this.state.articles.map( currentarticle => {
            return <Article article={ currentarticle } deleteArticle={ this.deleteArticle } key={ currentarticle._id } />;
        })
    }
    
    render() {
        return (
            <div className="container">
                <h6>Articles</h6>
                <table className="table">
                    <tbody>
                        { this.articleList() }
                    </tbody>
                </table>
            </div>
        )
    }
}
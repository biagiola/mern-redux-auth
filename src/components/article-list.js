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
            articles: [],
            lenguage: '',
            lenguages: []
        };
        this.onChangeLenguage = this.onChangeLenguage.bind(this);
        
    }
    
    componentDidMount() {
        axios.get( 'http://localhost:5000/articles/' )
        .then( response => {
            this.setState({ articles: response.data })
        })
        .catch( error => console.log(error) )

        axios.get('http://localhost:5000/lenguages/')
        .then( response => {
            if( response.data.length > 0 ) {
                this.setState({
                    lenguages: response.data.map( lenguages => lenguages.lenguage),
                    lenguage: response.data[0].lenguage
                })
            }
        })
    }

    onChangeLenguage(e) {
        this.setState({
            lenguage: e.target.value
        })
    }

    articleList() {
        return this.state.articles.map( currentarticle => {
            return <Article article={ currentarticle } deleteArticle={ this.deleteArticle } key={ currentarticle._id } />;
        })
    }
    
    render() {
        return (
            <div className="container">
                <h6>Show</h6>
                <select
                    defaultValue="all"
                    className="form-control"
                    value={ this.state.lenguage }
                    onChange={ this.onChangeLenguage }
                >
                {
                    this.state.lenguages.map( function(lenguage) {
                        return (<option
                                key={ lenguage }
                                value={ lenguage }
                            >
                            { lenguage }
                        </option>);
                    })
                }
                </select>
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
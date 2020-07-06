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
            setLenguage: '',
            lenguage: '',
            lenguages: []
        };
        this.onChangeLenguage = this.onChangeLenguage.bind(this);
    }
    
    componentDidMount() {
        // get the articles before the render
        axios.get( 'http://localhost:5000/articles/' )
            .then( res => {
                this.setState({ articles: res.data })
            })
            .catch( error => console.log(error) )
        
        // get the lenguages before the render
        axios.get('http://localhost:5000/lenguages/')
            .then( res => {
                if( res.data.length > 0 ) {
                    this.setState({
                        lenguages: res.data.map( lenguages => lenguages.lenguage),
                        lenguage: res.data[0].lenguage
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
            <div className="container mt-3">
                <h6>Articles</h6>
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
                
                <table className="table table-dark mt-3">
                    <tbody>
                        { this.articleList() }
                    </tbody>
                </table>
            </div>
        )
    }
}
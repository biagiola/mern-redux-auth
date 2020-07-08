import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

// this props comes from the state, that is map in articleList() 
const Article = props => (
    <div>
        <Link to={ '/details/' + props.article._id }>{ props.article.title }</Link>
    </div>
)

export default class ArticlesList extends Component {
    constructor(props) {
        super(props)
        this.state = {
            articles: [],
            lenguages: [],
            lenguage: '',
            flag: true
        };
        this.onChangeLenguage = this.onChangeLenguage.bind(this);
    }

    componentWillMount() {
        console.log('componentWillMount')
    }
    
    componentDidMount() {
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

        // get the articles before the render
        axios.get( 'http://localhost:5000/articles/' )
            .then( res => {
                this.setState({ articles: res.data })
            })
            .catch( error => console.log(error) )

        console.log('componentDidMount, articles', this.state.articles)
    }

    onChangeLenguage(e) {
        console.log('onChangeLenguage')
        this.setState({
            lenguage: e.target.value
        })

        let outter = 0;
        this.state.articles.map( element => {
            if (! (e.target.value === element.lenguage)) outter++  
        })

        if(outter === this.state.articles.length) {
            console.log(false);
            this.setState({ flag: false })
        } else {
            console.log(true);
            this.setState({ flag: true })
        }
    }

    articleList() {
        console.log('articleList')
        return this.state.articles.length ? this.state.articles.map( currentarticle => {
            // show only the articles according the lenguage selected
            if(currentarticle.lenguage === this.state.lenguage) {
                return <Article article={ currentarticle } deleteArticle={ this.deleteArticle } key={ currentarticle._id } />;
            }
        }) :
        (<Link to={'/create' } className="btn btn-primary mt-3">bAdd a new article</Link>)
    }
    
    render() {
        const updatedStates = (this.state.articles.length) ? true : false

        const show = (this.state.articles.length) ? 
                <div className="list-group mt-3">{ this.articleList() }</div> 
            :
                <Link to={'/create' } className="btn btn-primary mt-3">aAdd a new article</Link>

        return (
            <div className="wrapper container mt-3">
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
                {
                    /* the first react render call doeas not have the states updated
                    /*before to bring our articles to our state, we must to avoid to show the adds buttons*/
                    (updatedStates) ? show : <div className="text-dark"></div>
                }
            </div>
        )
    }
}
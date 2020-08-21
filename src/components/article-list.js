import React, { Component } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { PropTypes } from 'prop-types'
import { connect } from 'react-redux'
//import { setUsername } from '../actions'

// this props comes from the state, that is map in articleList() 
const Article = props => (
    <div>
        <Link 
            to={ '/details/' + props.article._id } 
            className="list-group-item list-group-item-secondary btn btn-primary "
        >{ props.article.title } - { props.article.lenguage }</Link>
    </div>
)

class ArticlesList extends Component {
    constructor(props) {
        super(props)
        this.state = {
            username: '',
            articles: [],
            lenguages: [],
            lenguage: '',
            flag: true
        }
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

        const token = 'bearer ' + this.props.authToken;

        // get the articles before the render
        axios.get('http://localhost:5000/articles', {
            headers: {
                'Authorization': token
            }
        })
        .then( res => {
            this.setState({ articles: res.data })
        })
        .catch( error => console.log(error) )

        this.setState({
            username: this.props.username
        })
        
        console.log('componentDidMount, articles', this.state.articles)
    }

    onChangeLenguage = (e) => {
        console.log('onChangeLenguage')
        this.setState({
            lenguage: e.target.value
        })
    }

    articleList() {
        console.log('articleList')

        return (this.state.articles.length) 
        ? this.state.articles.map( currentarticle => {
            return <Article article={ currentarticle } deleteArticle={ this.deleteArticle } key={ currentarticle._id } />;
        }) 
        : 
        <Link 
            to={ '/create' } 
            className="list-group-item list-group-item-secondary btn btn-primary "
        >Add a new one</Link>
    }
    
    render() {
        console.log('render, articles', this.state.articles)
        return (
            <div className="wrapper container mt-3">
                <h3 className="text-dark">Welcome { this.props.username }</h3>
                {
                    (this.state.articles.length) ? 
                        <div className="list-group mt-3">{ this.articleList() }</div> 
                        : 
                        <div className="text-dark"></div>
                }
            </div>
        )
    }
}

ArticlesList.propTypes = {
  username: PropTypes.string,
  authToken: PropTypes.string
}

const mapStateToProps = state => ({
  username: state.casa.username,
  authToken: state.casa.authToken
})

export default connect(mapStateToProps, null)(ArticlesList)
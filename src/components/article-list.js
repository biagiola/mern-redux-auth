import React, { Component } from 'react'
import { Link } from 'react-router-dom'

import { connect } from 'react-redux'
import { PropTypes } from 'prop-types'

import axios from 'axios'

// this props comes from the state, that is map in articleList() 
const Article = props => (
    <div className="card">
        <Link 
            to={ '/details/' + props.article._id } 
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
        .catch( error => this.props.history.push('/') )

        this.setState({
            username: this.props.username
        })
    }

    onChangeLenguage = (e) => {
        console.log('onChangeLenguage')
        this.setState({
            lenguage: e.target.value
        })
    }

    articleList() {
        return this.state.articles.length 
        ? this.state.articles.map
            (currentarticle => {
            return <Article 
                        article={ currentarticle } 
                        deleteArticle={ this.deleteArticle } 
                        key={ currentarticle._id } 
                    />
                }
            )
        :<Link 
            to={ '/create' } 
            className=""
        >Add a new one</Link>
    }
    
    render() {

        const value = this.props.moveContentValue ?
        "60px" :  "250px"

        const main = this.props.authToken !== null ?
        <div>
            <h3 className="text-dark">Welcome</h3>
            {
                this.state.articles.length ? 
                    <div className="list-group">{ this.articleList() }</div> 
                    : 
                    <div></div>
            }
        </div>
        :
        ''

        return (
            <div className="wrapper content" style={{ marginLeft: value }}>
                { main }
            </div>
        )
    }
}

ArticlesList.propTypes = {
  authToken: PropTypes.string
}

const mapStateToProps = state => ({
  authToken: state.casa.authToken,
  moveContentValue: state.casa.moveContentValue
})

export default connect(mapStateToProps, null)(ArticlesList)
import React, { Component } from 'react'
import { Link } from 'react-router-dom'

import { connect } from 'react-redux'
import { PropTypes } from 'prop-types'

import axios from 'axios'

class ArticlesList extends Component {
  constructor(props) {
    super(props)
    this.state = {
      username: '',
      articles: [],
      lenguages: [],
      lenguage: '',
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
      return <Link to={ '/details/' + currentarticle._id } key={ currentarticle._id }>
                <div 
                  className="card"
                  article={ currentarticle } 
                  deleteArticle={ this.deleteArticle } 
                  key={ currentarticle._id }
                  >{ currentarticle.title }
                </div>
              </Link>
        }
      )
    :<Link 
      to={ '/create' } 
      className=""
    >Add a new one</Link>
  }
  
  render() {
    
    const { moveContentValue, authToken } = this.props

    const margin = moveContentValue ?
    "60px" :  "250px"

    const main = authToken !== null ?
    <div>
      <h3 className="">Articles</h3>
      {
        this.state.articles.length ? 
          <div className="">{ this.articleList() }</div> 
          : 
          <div></div>
      }
    </div>
    :
    ''

    return (
      <div className="wrapper content" style={{ marginLeft: margin }}>
        { main }
      </div>
    )
  }
}

ArticlesList.propTypes = {
  authToken: PropTypes.string,
  moveContentValue: PropTypes.bool,
}

const mapStateToProps = state => ({
  authToken: state.main.authToken,
  moveContentValue: state.main.moveContentValue
})

export default connect(mapStateToProps, null)(ArticlesList)
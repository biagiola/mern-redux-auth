import React, { Component } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { PropTypes } from 'prop-types'
import { connect } from 'react-redux'

class DeleteArticle extends Component {
  constructor(props){
    super(props)
    this.state = {
      articles: []
    }
  }

  componentDidMount(){
    axios.get( 'http://localhost:5000/articles/' )
    .then( res => {
      this.setState({ articles: res.data })
    })
    .catch( error => console.log(error) )
  }

  render(){
    const empty = console.log('render', this.state.articles)
    if(!this.state.articles.length) {
      console.log('isArticlesEmpty')
    }

    const { moveContentValue } = this.props
    const value = moveContentValue ?
    "60px" :  "250px"

    return ( 
      <div className="wrapper content" style={{ marginLeft: margin }}>
        <div>Article was deleted</div><br/>
        <Link 
          to={'/dashboard'} 
          onClick={ () => this.isArticlesEmpty }
          className="btn btn-primary"
        >Go back</Link>
        { empty }
      </div>
      
    );
  }
}
 
DeleteArticle.propTypes = {
  articlesGone: PropTypes.func,
  moveContentValue: PropTypes.bool,
}

const mapStateToProps = (state) => ({
  moveContentValue: state.main.moveContentValue
})

export default connect(null, null)(DeleteArticle)
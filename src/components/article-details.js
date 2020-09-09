import React, { Component } from 'react'
import { Link, Redirect } from 'react-router-dom'

import { connect } from 'react-redux'
import { PropTypes } from 'prop-types'

import axios from 'axios'

class ArticleDetails extends Component {
  constructor(props) {
  super(props)
    this.state = {
      title: '',
      description: '',
      duration: 0,
      date: new Date(),
      lenguages: [],
      articles: [],
      showTitle: '',
      id: '',
    }
  }

  componentDidMount() {

    this.setState({
      id: this.props.match.params.id 
    })

    // get individual exercise.
    axios.get('http://localhost:5000/articles/' + this.props.match.params.id)
    .then(response => {
      this.setState({
        title: response.data.title,
        description: response.data.description,
        duration: response.data.duration,
        date: new Date(response.data.date)
      }) 
    })
    .catch(function (error) {
      console.log(error);
    })

      // get all lenguages.
    axios.get('http://localhost:5000/lenguages/')
    .then(response => {
      if (response.data.length > 0) {
        this.setState({
          lenguages: response.data.map(lenguage => lenguage.lenguage),
        })
      }
  }).catch( error => console.log(error) )
  }

  deleteArticle = id => {
    axios.delete( 'http://localhost:5000/articles/' + id )
      .catch( res => console.log( res.data ) )
    
    this.setState({
      articles: this.state.articles.filter( el => el._id !== id )  
    })
  }

  render() {
    const main = this.props.authToken !== null ?
    <div>
      <h3 className="text-center">{ this.state.title }</h3>

      <div className="container" style={{ 'padding': '0px 0px 0px', 'background' : '#d6d8db'}}>
        {this.state.description}
        <small style={ {'padding': '50px 0px 0px', } }>Written at: { this.state.date.toString().substr(0,10) }</small>
      </div>

      <div style={{ 'marginTop': '2rem'}}>
        <Link to={ '/edit/' + this.props.match.params.id } className="btn">edit</Link> 
        <Link to={"/deleted"} className="btn" onClick={ () =>{ this.deleteArticle(this.props.match.params.id) } }>delete</Link> 
        <Link to={"/dashboard"} className="btn">back</Link>
      </div>
        
    </div>
    :
    <div>
      <Redirect to="/" />
    </div>

    const value = this.props.moveContentValue ?
    "60px" :  "250px"

    return (
      <div className="wrapper content" style={{ marginLeft: value }}>
        { main }
      </div>
    )
  }
}   

ArticleDetails.propTypes = {
  username: PropTypes.string,
  authToken: PropTypes.string,
  moveContentValue: PropTypes.bool,
}
  
const mapStateToProps = state => ({
  username: state.main.username,
  authToken: state.main.authToken,
  moveContentValue: state.main.moveContentValue
})
  
export default connect(mapStateToProps, null)(ArticleDetails)
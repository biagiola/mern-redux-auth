import React, { Component } from 'react'
import { Link, Redirect } from 'react-router-dom'

import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import axios from 'axios'
import DatePicker from 'react-datepicker'
import "react-datepicker/dist/react-datepicker.css"

class EditArticle extends Component {
  constructor(props) {
    super(props)
    this.state = {
      lenguage: '',
      title: '',
      description: '',
      date: new Date(),
      lenguages: []
    }
  }

  componentDidMount() {
    axios.get('http://localhost:5000/articles/'+ this.props.match.params.id)
    .then(response => {
        this.setState({
            lenguage: response.data.lenguage,
            title: response.data.title,
            description: response.data.description,
            duration: response.data.duration,
            //date: new Date(response.data.date)
        })   
    })
    .catch( error => console.log(error) )

    axios.get('http://localhost:5000/lenguages/')
      .then(response => {
        if (response.data.length > 0) {
          this.setState({
            lenguages: response.data.map(lenguage => lenguage.lenguage),
          })
        }
      })
      .catch( error => console.log(error) )
  }

  onChangeLenguage = e => {
    this.setState({
      lenguage: e.target.value
    })
  }

  onChangeTitle = e => {
    this.setState({
        title: e.target.value
    })
  }

  onChangeDescription = e => {
    this.setState({
      description: e.target.value
    })
  }

  onChangeDuration = e => {
    this.setState({
      duration: e.target.value
    })
  }

  onChangeDate = date => {
    this.setState({
      date: date
    })
  }

  onSubmit = e => {
    e.preventDefault();

    const article = {
      lenguage: this.state.lenguage,
      title: this.state.title,
      description: this.state.description,
      duration: this.state.duration,
      date: this.state.date
    }

    console.log(article);

    axios.post('http://localhost:5000/articles/update/' + this.props.match.params.id, article)
      .then(res => console.log(res.data))

    alert('Article updated')
    this.props.history.push('/dashboard')
  }

  render() {

    const main = this.props.authToken !== null ?
    <div>
        <h3>Edit Article</h3>
        <form onSubmit={ this.onSubmit } className="container">
            <div className="form-group">
                <label>Title:</label>
                <input
                    type="text"
                    required
                    className="form-control text-dark list-group-item-secondary"
                    value={ this.state.title }
                    onChange={ this.onChangeTitle }
                />
                </div>
                <div className="form-group"> 
                <label>Description: </label>
                <textarea  
                    type="text"
                    required
                    className="form-control text-dark list-group-item-secondary"
                    rows="15"
                    value={ this.state.description }
                    onChange={ this.onChangeDescription }
                    />
                </div>
                <div className="form-group">
                <label>Date: </label>
                <div>
                    <DatePicker
                    selected={ this.state.date }
                    onChange={ this.onChangeDate }
                    />
                </div>
                </div>

                <div className="form-group">
                <input type="submit" value="save" className="btn" />
                <Link to={ '/details/' + this.props.match.params.id } type="button" className="btn btn-primary bg-primary text-light">back</Link>
            </div>
        </form>
    </div>
    :
    <div>
        <Redirect to="/" />
    </div>

    return (
      <div className="wrapper content">
        { main }
      </div>
    )
  }
}

EditArticle.propTypes = {
    authToken: PropTypes.string
  }

const mapStateToProps = state => ({
    authToken: state.casa.authToken
})

export default connect(mapStateToProps, null)(EditArticle)
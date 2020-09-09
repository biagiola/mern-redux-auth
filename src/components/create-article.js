import React, { Component } from 'react'

import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'

import { connect } from 'react-redux'
import { PropTypes } from 'prop-types'

import axios from 'axios'

class CreateArticle extends Component {
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
    axios.get('http://localhost:5000/lenguages/')
    .then( response => {
      if ( response.data.length > 0 ) {
        this.setState({
          lenguages: response.data.map( lenguages => lenguages.lenguage ),
          lenguage: response.data[0].lenguage
        })
      }
    }
    ).catch( error => console.log(error) )
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

  onChangeDate = date => {
    this.setState({
      date: date
    })
  }

  onSubmit = (e) => {
    e.preventDefault()

    const article = {
      lenguage: this.state.lenguage,
      title: this.state.title,
      description: this.state.description,
      date: this.state.date
    }

    axios.post('http://localhost:5000/articles/add', article)
    .then( res => console.log( 'respuesta ',res.data ) )
    .catch( err => console.log( err ))

    this.props.history.push('/dashboard')
  }

  render() {

    const value = this.props.moveContentValue ?
    "60px" :  "250px"

    return (
      <div className="wrapper content" style={{ marginLeft: value }}>
        <h3 className="">Create New Article</h3>
        <form onSubmit={ this.onSubmit } className="">
          <div className="form-group">
            <input
              placeholder='Title'
              type="text"
              required
              className="form__input"
              value={ this.state.title }
              onChange={ this.onChangeTitle }
            />
          </div>

          <div className="form-group">
            <textarea
              placeholder='Description'
              type="text"
              required
              className="form-control"
              rows="8"
              value={ this.state.description }
              onChange={ this.onChangeDescription }
            />
          </div>

          <div className="form-group">
            <select
              ref="userInput"
              required
              className="form__input"                        
              value={ this.state.lenguage }
              onChange={ this.onChangeLenguage }
              >{
                this.state.lenguages.map( function(lenguage) {
                return (<option
                  key={ lenguage }
                  value={ lenguage }
                >
                { lenguage }
                </option>)
              })
            }
            </select>
          </div>

          <div className="form-group">
            <div>
              <DatePicker
                selected={ this.state.date }
                onChange={ this.onChangeDate }
              />
            </div>
          </div>

          <div className="form-group">
            <input 
              type="submit" 
              className="btn btn-primary"
              value="Create" />
          </div>
        </form>
      </div>
    )
  }
}

CreateArticle.propTypes = {
  moveContentValue: PropTypes.bool,
}

const mapStateToProps = (state) => ({
  moveContentValue: state.main.moveContentValue
})

export default  connect(mapStateToProps, null)(CreateArticle)
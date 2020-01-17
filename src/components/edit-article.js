import React, { Component } from 'react';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";

export default class EditArticle extends Component {
  constructor(props) {
    super(props);
    this.state = {
      lenguage: '',
      title: '',
      description: '',
      date: new Date(),
      lenguages: []
    }

    this.onChangeLenguage = this.onChangeLenguage.bind(this);
    this.onChangeTitle = this.onChangeTitle.bind(this);
    this.onChangeDescription = this.onChangeDescription.bind(this);
    this.onChangeDuration = this.onChangeDuration.bind(this);
    this.onChangeDate = this.onChangeDate.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

  }

  componentDidMount() {
    axios.get('http://localhost:5000/exercises/'+ this.props.match.params.id)
    .then(response => {
        this.setState({
            lenguage: response.data.lenguage,
            title: response.data.title,
            description: response.data.description,
            duration: response.data.duration,
            date: new Date(response.data.date)
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

  onChangeLenguage(e) {
    this.setState({
      lenguage: e.target.value
    })
  }

  onChangeTitle(e) {
    this.setState({
        title: e.target.value
    })
  }

  onChangeDescription(e) {
    this.setState({
      description: e.target.value
    })
  }

  onChangeDuration(e) {
    this.setState({
      duration: e.target.value
    })
  }

  onChangeDate(date) {
    this.setState({
      date: date
    })
  }

  onSubmit(e) {
    e.preventDefault();

    const article = {
      lenguage: this.state.lenguage,
      title: this.state.title,
      description: this.state.description,
      duration: this.state.duration,
      date: this.state.date
    }

    console.log(article);

    axios.post('http://localhost:5000/exercises/update/' + this.props.match.params.id, article)
      .then(res => console.log(res.data));

    window.location = '/';
  }

  render() {
    return (
    <div>
        {/*<div className="form-group"> 
          <label>Username: </label>
          <select ref="userInput"
              required
              className="form-control"
              value={this.state.username}
              onChange={this.onChangeUsername}>
              {
                this.state.users.map(function(user) {
                  return <option 
                    key={user}
                    value={user}>{user}
                    </option>;
                })
              }
          </select>
        </div>*/}
        <h3>Edit Article Log</h3>
        <form onSubmit={this.onSubmit} className="container">
            <div className="form-group">
                <label>Title:</label>
                <input
                    type="text"
                    required
                    className="form-control text-dark"
                    value={this.state.title}
                    onChange={this.onChangeTitle}
                />
            </div>
            <div className="form-group"> 
            <label>Description: </label>
            <textarea  
                type="text"
                required
                className="form-control text-dark"
                rows="15"
                value={this.state.description}
                onChange={this.onChangeDescription}
                />
            </div>
            <div className="form-group">
            <label>Date: </label>
            <div>
                <DatePicker
                selected={this.state.date}
                onChange={this.onChangeDate}
                className="text-dark"
                />
            </div>
            </div>

            <div className="form-group">
            <input type="submit" value="Edit Article Log" className="btn btn-primary bg-primary text-light" />
            </div>

        </form>
    </div>
    )
  }
}
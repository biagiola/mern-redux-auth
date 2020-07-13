import React, { Component } from 'react';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import { Link } from 'react-router-dom';

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
    axios.get('http://localhost:5000/articles/'+ this.props.match.params.id)
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

    axios.post('http://localhost:5000/articles/update/' + this.props.match.params.id, article)
      .then(res => console.log(res.data));

    alert('Article updated');
    this.props.history.push('/dashboard');
  }

  render() {
    return (
    <div className="wrapper text-dark">
      <h3>Edit Article</h3>
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
          <input type="submit" value="save" className="btn btn-primary bg-primary text-light" />
          <Link to={'/details/' + this.props.match.params.id} type="button" className="btn btn-primary bg-primary text-light">back</Link>
        </div>

      </form>
    </div>
    )
  }
}
import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

export default class EditExercise extends Component {
    constructor(props) {
    super(props);
    this.state = {
      username: '',
      title: '',
      description: '',
      duration: 0,
      date: new Date(),
      users: [],
      exercises: [],
      id: ''
    }
        this.deleteExercise = this.deleteExercise.bind(this);
    }

    componentDidMount() {

        this.setState({
            id: this.props.match.params.id 
        })

        // get individual exercise.
        axios.get('http://localhost:5000/exercises/'+this.props.match.params.id)
        .then(response => {
            this.setState({
            username: response.data.username,
            title: response.data.title,
            description: response.data.description,
            duration: response.data.duration,
            date: new Date(response.data.date)
            }) 
        })
        .catch(function (error) {
            console.log(error);
        })
        // get all users.
        axios.get('http://localhost:5000/users/')
        .then(response => {
            if (response.data.length > 0) {
            this.setState({
                users: response.data.map(user => user.username),
            })
            }
        })
        .catch((error) => {
            console.log(error);
        })
    }

    deleteExercise( id ) {
        axios.delete( 'http://localhost:5000/exercises/' + id )
            .then( res => console.log( res.data ) );
            this.setState({
                exercises: this.state.exercises.filter( el => el._id !== id )  
            }).then(window.location = '/')
    }

  render(props) {
    return (
    <div>
        <h6>{ this.state.title }</h6>
        <p>{ this.state.description }</p>
        <Link to={ '/edit/' + this.props.match.params.id } className="btn btn-primary">edit</Link> 
        <Link to={"/"} className="btn btn-primary" onClick={ () =>{ this.deleteExercise(this.props.match.params.id)} }>delete</Link> 
        <Link to={"/"} className="btn btn-primary">back</Link>
    </div>
    )
  }
}
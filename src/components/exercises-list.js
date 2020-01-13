import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

// this props comes from the state, that is map in exerciseList() 
const Exercise = props => (
    <tr>
        <td>
            <Link to={ '/details/' + props.exercise._id }>{ props.exercise.title }</Link>
        </td>
    </tr>
)

export default class ExercisesList extends Component {
    constructor(props) {
        super(props)
        this.state = {
             exercises: []
        };
        
    }
    
    componentDidMount() {
        axios.get( 'http://localhost:5000/exercises/' )
            .then( response => {
                this.setState({ exercises: response.data })
            })
            .catch( ( error ) => {
                console.log(error);
            })
    }

    exerciseList() {
        return this.state.exercises.map( currentexercise => {
            return <Exercise exercise={ currentexercise } deleteExercise={ this.deleteExercise } key={ currentexercise._id } />;
        })
    }
    
    render() {
        return (
            <div>
                <table className="table">
                    <thead className="thead-light">
                        <tr>
                            <th>Title</th>
                        </tr>
                    </thead>
                    <tbody>
                        { this.exerciseList() }
                    </tbody>
                </table>
            </div>
        )
    }
}

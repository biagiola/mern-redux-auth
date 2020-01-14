import React, { Component } from 'react';
import axios from 'axios';

export default class CreateUsers extends Component {
    constructor(props) {
        super(props)
        this.state = {
            lenguage: ''
        }
        this.onChangeLenguage = this.onChangeLenguage.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }
    
    onChangeLenguage(e) {
        this.setState({
            lenguage: e.target.value
        });
    } 

    onSubmit(e) {
        e.preventDefault();

        const lenguage = {
            lenguage: this.state.lenguage,
        }
        axios.post('http://localhost:5000/lenguages/add', lenguage)
            .then( res => console.log( res.data ) );
        
        this.setState({
            lenguage: ''
        })
    }

    render() {
        return (
            <div>
                <h3>Add new lenguage</h3>
                <form onSubmit={ this.onSubmit } className="container">
                    <div className='form-group'>
                        <label>Lenguage: </label>
                        <input
                            type="text"
                            required
                            className="form-control"                        
                            value={ this.state.lenguage }
                            onChange={ this.onChangeLenguage }
                        />
                    </div>
                    <div className="form-group">
                        <input type="submit" value="Add" className="btn btn-primary"/>
                    </div>
                </form>
            </div>
        )
    }
}


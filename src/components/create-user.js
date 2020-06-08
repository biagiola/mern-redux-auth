import React, { Component } from 'react';
import axios from 'axios';
import { registerValidation } from '../validation';
import { browserHistory } from 'react-router';

export default class newUser extends Component {
    constructor(props){
        super(props);
        this.state = {
            name: '',
            email: '',
            password: '',
            location: '*',
            registerMessage: ''
        }
        this.onSubmit = this.onSubmit.bind(this);
        this.changeName = this.changeName.bind(this);
        this.changeEmail = this.changeEmail.bind(this);
        this.changePassword = this.changePassword.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    changeName(e) {
        this.setState({
            name: e.target.value
        });
    }
    changeEmail(e) {
        this.setState({
            email: e.target.value
        });
    }
    changePassword(e) {
        this.setState({
            password: e.target.value
        });
    }
    onSubmit(e) {
        e.preventDefault();

        const newUser = {
            name: this.state.name,
            email: this.state.email,
            password: this.state.password
        }

        const { error } = registerValidation(newUser);
        this.setState({
            registerMessage: error
        })
        axios.post('http://localhost:5000/auth/register', newUser)
            .then(function (response) {
                console.log(response);
                browserHistory.push('/hola')
            })

        
    }

    render() {
        return (
            <div>
                <form onSubmit={ this.onSubmit }>
                    <label>Enter your name</label>
                    <input 
                        type="text"
                        className="form-control"
                        value={ this.state.name } 
                        onChange={ this.changeName } />
                        <br/>
                    <label>Enter your email</label>
                    <input 
                        type="text"
                        className="form-control"
                        value={ this.state.email } 
                        onChange={ this.changeEmail } />
                        <br/>
                    <label>Enter your password</label>
                    <input 
                        type="text" 
                        className="form-control"
                        value={ this.state.password }
                        onChange={ this.changePassword } />
                        <br/>
                    <button className="btn btn-primary">Send</button>
                </form>
            </div>
        )
    }
}

import React, { Component } from 'react';
import axios from 'axios';

export default class newUser extends Component {
    constructor(props){
        super(props);
        this.state = {
            name: '',
            email: '',
            password: ''
        }
        this.onSubmit = this.onSubmit.bind(this);
        this.changeName = this.changeName.bind(this);
        this.changeEmail = this.changeEmail.bind(this);
        this.changePassword = this.changePassword.bind(this);
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
        axios.post('http://localhost:5000/auth/register', newUser)
            .then( res => console.log( res.data ));

        window.location = '/';
    }

    render() {
        return (
            <div>
                <form onSubmit={ this.onSubmit }>
                    <labe>Enter your name</labe>
                    <input 
                        type="text"
                        value={ this.state.name } 
                        onChange={ this.changeName } />
                    <labe>Enter your email</labe>
                    <input 
                        type="text"
                        value={ this.state.email } 
                        onChange={ this.changeEmail } />
                    <labe>Enter your password</labe>
                    <input 
                        type="text" 
                        value={ this.state.password }
                        onChange={ this.changePassword } />
                    <button>Send</button>
                </form>
            </div>
        )
    }
}

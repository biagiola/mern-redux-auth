import React, { Component } from 'react'
import axios from 'axios'

export default class CreateUsers extends Component {
    constructor(props) {
        super(props)
        this.state = {
            lenguage: '',
            lenguages: []
        }
        this.onChangeLenguage = this.onChangeLenguage.bind(this)
        this.onSubmit = this.onSubmit.bind(this)
        this.onSubmitHandle = this.onSubmitHandle.bind(this)
    }

    componentDidMount(){
        axios.get('http://localhost:5000/lenguages/')
            .then( response => {
                if( response.data.length > 0 ) {
                    this.setState({
                        lenguages: response.data.map( lenguages => lenguages.lenguage)
                    })
                }
            })
    }
    
    onChangeLenguage(e) {
        this.setState({
            lenguage: e.target.value
        });
    } 

    onSubmit(e) {
        e.preventDefault()

        const lenguage = {
            lenguage: this.state.lenguage,
        }
        axios.post('http://localhost:5000/lenguages/add', lenguage)
            .then( res => console.log( res.data ) );
        
        this.setState({
            lenguage: ''
        })
    }

    onSubmitHandle(e){
        e.preventDefault()
        console.log('testing')
    }   

    render() {
        return (
            <div className="wrapper">
                <h3 className="text-dark container mt-2">Add new lenguage</h3>
                <form onSubmit={ this.onSubmit } className="container text-dark">
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
                        <input 
                            type="submit" 
                            value="Add" 
                            className="btn btn-primary"
                            onSubmit={ this.onSubmitHandle }/>
                    </div>
                </form>
                <h3 className="text-dark container">Available languages</h3>
                {
                    this.state.lenguages.map( function(lenguage) {
                        return (
                        <span className="btn btn-danger" key={lenguage}>{ lenguage } </span>
                        )
                    })
                }
            </div>
        )
    }
}


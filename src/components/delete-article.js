import React, { Component } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { PropTypes } from 'prop-types'
import { connect } from 'react-redux'
//import { articlesGone } from '../actions'

class DeleteArticle extends Component {
    constructor(props){
        super(props)
        this.state = {
            articles: []
        }
    }

    componentDidMount(){
        axios.get( 'http://localhost:5000/articles/' )
            .then( res => {
                this.setState({ articles: res.data })
            })
            .catch( error => console.log(error) )
    }

    render(){

        const empty = console.log('render', this.state.articles)
        if(!this.state.articles.length) {
            console.log('isArticlesEmpty')
            this.props.articlesGone()
        }

        return ( 
            <div className="wrapper container">
                <div className="text-dark">Article was deleted</div><br/>
                <Link to={'/dashboard'} onClick={ () => this.isArticlesEmpty }className="btn btn-primary">Go back</Link>
                { empty }
            </div>
            
        );
    }
}
 
DeleteArticle.propTypes = {
    articlesGone: PropTypes.func
}

const mapDispatchToProps = dispatch => {
    return {
        //articlesGone: () => dispatch(articlesGone())
    }
}

export default connect(null, mapDispatchToProps)(DeleteArticle)
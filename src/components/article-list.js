import React, { Component } from 'react'
import axios from 'axios'
import { PropTypes } from 'prop-types'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'

// this props comes from the state, that is map in articleList() 
const Article = props => (
    <div>
        <Link to={ '/details/' + props.article._id }>{ props.article.title }</Link>
    </div>
)

class ArticlesList extends Component {
    constructor(props) {
        super(props)
        this.state = {
            articles: [],
            lenguages: [],
            lenguage: '',
            currentLenguage: true,
            linkTag:false,
            counter: 0
        };
        this.onChangeLenguage = this.onChangeLenguage.bind(this);
    }
    
    componentDidMount() {
        // get the lenguages before the render
        axios.get('http://localhost:5000/lenguages/')
            .then( res => {
                if( res.data.length > 0 ) {
                    this.setState({
                        lenguages: res.data.map( lenguages => lenguages.lenguage),
                        lenguage: res.data[0].lenguage
                    })
                }
            })

        // get the articles before the render
        axios.get( 'http://localhost:5000/articles/' )
            .then( res => {
                this.setState({ articles: res.data })
            })
            .catch( error => console.log(error) )

        console.log('componentDidMount, articles', this.state.articles)
    }

    onChangeLenguage(e) {
        if(e === undefined) {
            if(this.state.counter===0){this.setState({
                currentLenguage: false,
            })
            }
            return
        }
        console.log('onChangeLenguage', e.target.value)
        this.setState({
            lenguage: e.target.value
        })

        let outter = 0;
        this.state.articles.map( element => {
            if ( (e.target.value === element.lenguage)) return outter++  
        })

        if(outter === 0) { // there is not elements of this lenguage
            console.log('currentLenguage', false)
            this.setState({ currentLenguage: false })
        } else {
            console.log('currentLenguage', true);
            this.setState({ currentLenguage: true })
        }
    }

    articleList() {
        if(this.state.counter === 0){this.setState({
            counter: this.state.counter+1
        })}

        console.log('articleList',this.state.articles[this.state.lenguage])
        /* if there are not any articles of that especific lenguage we show a linkTag to go to "add new one"*/
        return (this.state.articles && this.state.currentLenguage ) ? this.state.articles.map( currentarticle => {
            console.log('articleList enter if')
            // show only the articles according the lenguage selected
            if(currentarticle.lenguage === this.state.lenguage) {
                return <Article article={ currentarticle } deleteArticle={ this.deleteArticle } key={ currentarticle._id } />;
            }  
        }) :
        <Link to={'/create' } className="btn btn-primary mt-3">bAdd a new article</Link>

    }

    shouldComponentUpdate(nextProps, nextState) {
        if(nextState !== this.state) {
            console.log('shouldComponentUpdate', true)
            return true
        }
        console.log('shouldComponentUpdate', false)
        return false
    }
    
    //this lifecycle method we make sure to not show the "add button" in the first render call when componentDidMound is still
    //saving the data from the db to the state. 
    getSnapshotBeforeUpdate(prevProps, prevState) {
        console.log('getSnapshotBeforeUpdate prevState.articles', prevState.articles)
        console.log('getSnapshotBeforeUpdate state.articles', this.state.articles)
        if (prevState.articles === this.state.articles) {
            return true     
        }
        this.setState({
            linkTag: <Link to={'/create' } className="btn btn-primary mt-3">aAdd a new one</Link>
        })
        return false
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        console.log('componentDidUpdate prevState.articles', prevState.articles, snapshot)
        console.log('componentDidUpdate state.articles', this.state.articles, snapshot)
        
        if(prevProps.articles === this.state.articles) {
            console.log('componentDidUpdate enter')
            this.setState({
                currentLenguage: false
            })
        }
    }

    render() {
        const show = <div className="list-group mt-3">{ this.articleList() }</div> 
        this.onChangeLenguage()
        console.log('render articles', this.state.articles.length)
        //console.log('gone',this.props.gone)
        return (
            <div className="wrapper container mt-3">
                <h6>Articles</h6>
                <select
                    className="form-control"
                    value={ this.state.lenguage }
                    onChange={ this.onChangeLenguage }
                >
                {
                    this.state.lenguages.map( function(lenguage) {
                        return (<option
                                key={ lenguage }
                                value={ lenguage }
                            >
                            { lenguage }
                        </option>);
                    })
                }
                </select>
                {
                    /* if there are not any articles of any lenguage we show a linkTag to go to "add new one"*/
                    (this.state.articles.length) ? show : this.state.linkTag
                }
            </div>
        )
    }
}

ArticlesList.propTypes = {
    gone: PropTypes.bool
}
const mapStateToProps = state => ({
    gone: state.casa.gone
})

export default connect(mapStateToProps, null)(ArticlesList)
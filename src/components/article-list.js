import React, { useState, useEffect } from 'react'
import { Link, Redirect } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { withRouter } from 'react-router'
import axios from 'axios'

function ArticlesList() {
  const [articles, setArticles] = useState([])
  const authToken = useSelector(store => store.main.authToken)

  
  
  // This execute the first render and everytime authToken changes
  useEffect( () => {
    const token = 'bearer ' + authToken;  
    axios.get('http://localhost:5000/articles', {
      headers: {
        'Authorization': token
      }
    })
    .then( res => {
      setArticles(res.data)
    })
    .catch( error => console.log(error) )
    //.catch( error => this.props.history.push('/') )
  }, [authToken])

  const taggedArticles = articles.length ? 
  articles.map
  (currentarticle => {
    return (
      <Link to={ '/details/' + currentarticle._id } key={ currentarticle._id }>
        <div 
          className="card"
          article={ currentarticle } 
          key={ currentarticle._id }
          >{ currentarticle.title }
        </div>
      </Link>)
  })
  : 
  <Link to={'/create'} className="btn">Add an Article</Link>

  const moveContentValue = useSelector( store => store.main.moveContentValue)
  const margin = moveContentValue ?
  "60px" :  "250px" 

  const show = authToken === null ? 
  <Redirect to={'/'}></Redirect> 
  :
  <div>
    <h2>Articles</h2> 
    {taggedArticles}
  </div>

  return (
    <div className="wrapper content" style={{ marginLeft: margin }}>
      {show}
    </div>
  )
}

export default withRouter(ArticlesList)
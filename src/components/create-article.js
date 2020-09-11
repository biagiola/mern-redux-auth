import React, { useState, useEffect, useRef } from 'react'
import { Link, Redirect } from 'react-router-dom'
import { withRouter } from 'react-router'
import { useSelector } from 'react-redux'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import axios from 'axios'

function CreateArticle(props) {
  const lenguageRef = useRef('')
  const [lenguages, setLenguages] = useState([])
  const [lenguage, setLenguage] = useState('')
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [date, setDate] = useState('')

  useEffect( () => {
      axios.get('http://localhost:5000/lenguages/')
      .then( response => {
          if ( response.data.length > 0 ) {
            setLenguages(response.data.map( lenguages => lenguages.lenguage ))
          }
        }
      ).catch( error => console.log(error))

      return () => {
        
      }

    }, 
    [lenguages]
  )
  
  const onSubmit = e => {
    e.preventDefault()

    const article = {
      lenguage: lenguage,
      title: title,
      description: 'blahblahba',
      date: date
    }

    axios.post('http://localhost:5000/articles/add', article)
    .then( res => console.log( 'respuesta ',res.data ) )
    .catch( err => console.log( err ))

    props.history.push('/dashboard')
  }

  const moveContentValue = useSelector(store => store.main.moveContentValue)
  const margin = moveContentValue ?
  "60px" :  "250px"

  console.log('render', lenguages)

  return (
    
    <div className="wrapper content" style={{ marginLeft: margin }}>
      <h3 className="">Create New Article</h3>
      <form onSubmit={ onSubmit } className="">
        <div className="form-group">
          <input
            placeholder='Title'
            type='text'
            required
            value={ title }
            onChange={ e => setTitle(e.target.value) }
            />
        </div>

        <div className="form-group">
          <textarea
            placeholder='Write your article...'
            type='text'
            required
            rows="8"
            value={ description }
            onChange={ e => setDescription(e.target.value) }
            
          />
        </div>

        <div className='form-group'>
          <select
            ref={lenguageRef}
            required
            value={ lenguage }
            onChange={ e => setLenguage(e.target.value) }>
            {console.log('select',lenguages)}
            {
              lenguages.map( lenguage => <option key={ lenguage } value={ lenguage }>{ lenguage }</option> )
            }
          </select>
        </div>

        <div className="form-group">
          <div>
            <DatePicker
              selected={ date }
              onChange={ e => setDate(e) }
            />
          </div>
        </div>

        <div className="form-group">
          <input 
            type="submit" 
            className="btn btn-primary"
            value="Create" />
        </div> 
      </form>
    </div>
  )
}

export default withRouter(CreateArticle)
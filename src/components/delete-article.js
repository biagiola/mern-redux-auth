import React from 'react';
import { Link } from 'react-router-dom';

const DeleteArticle = () => {
    return ( 
        <div className="wrapper container">
            <div>Article was deleted</div><br/>
            <Link to={'/'} className="btn btn-primary">Go back</Link>
        </div>
        
    );
}
 
export default DeleteArticle;
import React from 'react';
import { Link } from 'react-router-dom';

const DeleteMessage = () => {
    return ( 
        <div className="container">
            <div>Article was deleted</div><br/>
            <Link to={'/'} className="btn btn-primary">Go back</Link>
        </div>
        
    );
}
 
export default DeleteMessage;
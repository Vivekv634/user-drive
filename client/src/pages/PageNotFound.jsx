import React from 'react';
import NotFoundImage from '../images/pageNotFound.svg';

export default function PageNotFound() {
    return (
        <div className="page-not-found">
            <img src={NotFoundImage} alt="" />
            Page Not Found
        </div>
    )
}

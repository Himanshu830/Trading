import React from 'react';

export const SuccessMessage = ({ message }) => {
    return (
        <div className="alert alert-success alert-dismissible fade show" role="alert">
            { message }
            <button type="button" className="close" data-dismiss="alert" aria-label="Close">
                <span aria-hidden="true">&times;</span>
            </button>
        </div>  
    )
}

export const ErrorMessage = ({ message }) => {
    return (
        <div className="alert alert-danger alert-dismissible fade show" role="alert">
            { message }
            <button type="button" className="close" data-dismiss="alert" aria-label="Close">
                <span aria-hidden="true">&times;</span>
            </button>
        </div>
    )
}

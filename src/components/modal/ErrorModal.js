import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';

import './modal.css';

const ErrorModal = ({ isDisplay, title, content, onSubmit }) => {
    const [show, setShow] = useState(isDisplay)

    useEffect(() => {
        setShow(isDisplay)  
    }, [isDisplay])

    const onClose = () => {
        setShow(false)
        onSubmit()
    }

    const modalHtml = () => {
        console.log(show)
        let display = (isDisplay && show) ? 'block' : 'none';

        return (
            <div className="modal show" style={{ display: display }} id="exampleModalLong" role="dialog"
                aria-labelledby="exampleModalLongTitle" aria-hidden="true">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLongTitle">{title}</h5>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={onClose}>
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            {content}
                        </div>
                        <div className="modal-footer">
                            <button onClick={onClose} className="btn btn-danger" data-dismiss="modal">Okay</button>
                        </div>
                    </div>
                </div>
            </div>
        )
    };

    return ReactDOM.createPortal(
        modalHtml(),
        document.querySelector('#modal')
    )
}

export default ErrorModal;
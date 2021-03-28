import React from 'react';
import ReactDOM from 'react-dom';
import './modal.css';

const Modal = ({ title, content, onSubmit, onCancel }) => {

    const modalHtml = () => (
        <div className="modal" id="exampleModalLong" role="dialog"
            aria-labelledby="exampleModalLongTitle" aria-hidden="true">
            <div className="modal-dialog" role="document">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="exampleModalLongTitle">{title}</h5>
                        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div className="modal-body">
                        {content}
                    </div>
                    <div className="modal-footer">
                        <button  onClick={onSubmit} className="btn btn-danger" data-dismiss="modal">Delete</button>
                        <button  onClick={onCancel} className="btn btn-secondary" data-dismiss="modal">Close</button>
                    </div>
                </div>
            </div>
        </div>
    );

    return ReactDOM.createPortal(
        modalHtml(),
        document.querySelector('#modal')
    )
}

export default Modal;
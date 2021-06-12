import React from "react";
import { useState } from 'react';
import { SITE_URL } from '../../config'
import Dropzone from "react-dropzone";
import { upload } from './apiChat';

const ChatForm = ({ token, from, to, onSendMessage }) => {
    const [message, setMessage] = useState('');

    const buildMessage = (message) => {
        return {
            message,
            from,  
            to,
            type: 'text'
        }
    }

    const onSubmit = (e) => {
        e.preventDefault();

        let messageObj = buildMessage(message)
        onSendMessage(messageObj)
        setMessage('')
    }

    const onDropFile = (files) => {
        let formData = new FormData()

        formData.append('file', files[0])
        console.log('uploading file...')
        upload(token, formData).then(res => {
            if(!res.success) {
                return console.log('something went wrong in uploading file...')
            }

            let message = {
                message: res.url,
                from: from._id,
                to: to,
                type: 'image_or_video'
            }

            onSendMessage(message)
            // setMessage('')
        }).catch(error => {
            console.log(error)
        })
    }

    return (
        <form id="chat-form" onSubmit={onSubmit}>
                <Dropzone onDrop={acceptedFiles => onDropFile(acceptedFiles)}>
                    {({getRootProps, getInputProps}) => (
                        <div {...getRootProps()}>
                            <input {...getInputProps()} />
                            <img src={ `${SITE_URL}/images/icons/attachment-logo.svg` } height="30px" alt="Add Attachment" />
                        </div>
                    )}
                </Dropzone>

                {/* <img src={ `${SITE_URL}/images/icons/attachment-logo.svg` } height="30px" alt="Add Attachment" /> */}


                <input 
                    type="text" 
                    placeholder="type a message" 
                    onChange={(e) => setMessage(e.target.value)} 
                    value={message}    
                />
        </form>
    );
};

export default ChatForm;



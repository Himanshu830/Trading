import React from "react";
import moment from 'moment';
import { API } from "../../config";

const ImageMessage = ({ message, messageClass }) => {
    let imageName = message.message.substring(6);
    return (
        <div className={`message-row ${messageClass}`}>
            <div className="message-content">
                {/* <div className="message-text">{ message.message }</div> */}
                <img  
                    style={{maxWidth:'200px'}}
                    src={`${API}${imageName}`} 
                    alt={message.message} />
                <div className="message-time">{ moment(message.createdAt).format('LT') }</div>
            </div>
        </div>
    );

};

export default ImageMessage;



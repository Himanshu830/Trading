import React from "react";
import moment from 'moment';
import { API } from '../../config'

const VideoMessage = ({ message, messageClass }) => {
    let videoName = message.message.substring(6);

    return (
        <div className={`message-row ${messageClass}`}>
            <div className="message-content">
                <video 
                    style={{maxWidth:'200px'}}
                    src={`${API}${videoName}`} 
                    alt="video"   
                    type="video/mp4" controls />
                <div className="message-time">{ moment(message.createdAt).format('LT') }</div>
            </div>
        </div>
    );

};

export default VideoMessage;



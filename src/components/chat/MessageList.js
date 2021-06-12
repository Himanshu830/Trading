import React, { Component, Fragment } from "react";
import TextMessage from './TextMessage';
import ImageMessage from './ImageMessage';
import VideoMessage from './VideoMessage';
import { SITE_URL } from '../../config'

class MessageList extends Component {
    // state = {messages: []}
  
    // componentDidMount() {
    //     const { chatMessage, from } = this.props
    //     chatMessage(from);
    // }

    messageList = () => {
        // this.props.socket.on('message', (data) => {
        //     this.setState({messages: data})
        // })


        const { messages, from } = this.props;   
        if(!messages) {
            return <div></div>
        }

        let messageClass = '';
        return messages.map((message, index) => {
            messageClass = from._id === message.from ? 'you-message' : 'other-message';

            if(message.type === 'text') {
                return <TextMessage key={index} message={message} messageClass={messageClass} />
            } else if(message.message.split('.').pop() !== 'mp4'){
                console.log(`image: ${message.message}`)
                return <ImageMessage key={index} message={message} messageClass={messageClass} />    
            } else {
                console.log(`video: ${message.message}`)
                return <VideoMessage key={index} message={message} messageClass={messageClass} />
            }

            
// console.log(message.message.split('.'))
            // return <TextMessage key={index} message={message} messageClass={messageClass} />
        });
    }

    render() {
        const { to: to_user } = this.props;
        const userName = to_user && to_user.name ? to_user.name : '';

        return (
            <Fragment>
                <div id="chat-title">
                    <span>{ userName }</span>
                    <img src={ `${SITE_URL}/images/icons/trash.png` } height="30px" alt="Delete Conversation" />
                </div>

                <div id="chat-message-list">
                    { this.messageList() }
                </div>
            </Fragment>
        );
    }
};

export default MessageList;

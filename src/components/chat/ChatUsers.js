import React, { Component } from 'react';
import { isAuthenticated } from "../auth";
import Layout from '../core/Layout';
import UserList from './UserList';
import Search from './Search';
import ChatForm from './ChatForm';
import { getUsers, getChats } from './apiChat';
import io from 'socket.io-client';
import MessageList from './MessageList';

import './chat.css';  

class ChatUser extends Component {
    // state = { token: '', profile: {}, users: [], selectedUser: {}, messages: []}
    // socket = io(process.env.REACT_APP_API_URL, {transports: ['websocket', 'polling', 'flashsocket']});

    // componentDidMount() {
    //     const { token, user } = isAuthenticated();

    //     this.setState({token});
    //     this.setState({profile: user});

    //     getUsers(token).then( users => {
    //         this.setState({users})
    //     }).catch(error => {
    //         console.log('Error in fetching chat users')
    //     })
    // }

    // componentDidUpdate() {
    //     this.socket.on('message', (data) => {
    //         this.setState({messages: data})
    //     })
    // }

    // getChatMessages = (userId) => {
    //     getChats(this.state.token, userId).then( chats => {
    //         this.setState({messages: chats})
    //     }).catch(error => {
    //         console.log('Error in fetching chats.')
    //     })
    // }

    // sendMessage = (message) => {
    //     this.socket.emit('sendMessage', message, (error, messages) => {
    //         if (error) {
    //             return console.log(error)
    //         }

    //         this.setState({ messages })
    //     })
    // }

    // onUserSelect = (user) => {
    //     this.setState({selectedUser: user})
    //     this.getChatMessages(user._id)
    // }

    // renderMessageList = () => {
        

    //     return (
    //         <MessageList 
    //             from={this.state.profile} 
    //             to={this.state.selectedUser}
    //             messages={this.state.messages}
    //             // chatMessage= { this.getChatMessages }
    //             // socket={this.socket}
    //             />
    //     )
    // }

    // renderChatForm = () => {
    //     if(Object.keys(this.state.selectedUser).length === 0) {
    //         return <div></div>
    //     }

    //     return (
    //         <ChatForm 
    //                 from={this.state.profile} 
    //                 to={this.state.selectedUser}
    //                 onSendMessage={this.sendMessage} />
    //     )
    // }

    // chatHtml = () => {
    //     return (
    //         <div id="chat-container">
    //             <Search />
    //             <UserList users={this.state.users} userSelect={this.onUserSelect} />
                
    //             { this.renderMessageList() }
    //             { this.renderChatForm()  }
    //         </div>
    //     );
    // }

    render() {
        return (
            <Layout className="chat-wrapper">
                hello
            </Layout>
        );
    }
}

export default ChatUser;
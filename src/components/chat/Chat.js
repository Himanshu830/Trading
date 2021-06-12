import React, { Component } from 'react';
// import { isAuthenticated } from "../auth/api";
import UserList from './UserList';
import Search from './Search';
import ChatForm from './ChatForm';
import { getUsers, getChatUsers, getChats } from './apiChat';
import io from 'socket.io-client';
import MessageList from './MessageList';
// import Sidebar from '../layout/partial/Sidebar';

 import './chat.css';  
import Layout from '../layout/Layout';

class Chat extends Component {
    state = { loading: false, token: null, search: '', profile: {}, users: [], selectedUserId: undefined, selectedUser: {}, messages: []}
    socket = io(process.env.REACT_APP_API_URL, {transports: ['websocket', 'polling', 'flashsocket']});

    componentDidMount() {
        const { token, user } = this.props

        this.setState({token}, () => {
            if(this.props.match.params.userId) {
                const { userId } = this.props.match.params
                this.setState({selectedUserId: userId})
                this.getChatMessages(userId)
            }
        });

        this.setState({profile: user}, () => {
            console.log('joining room')
            this.socket.emit('join', { _id: user._id });

            this.setState({loading: true})
            this.setChatUser()
        });
        
        // this.setState({isMounted: true})
    }

    setChatUser = () => {
        const { token, user } = this.props
        getChatUsers(user._id, token).then( users => {
            this.setState({users: users.chatUsers, loading: false})
        }).catch(error => {
            console.log('Error in fetching chat users')
        })
    }

    searchUser = (searchTerm) => {
        if(searchTerm.trim() === '') {
            this.setChatUser()
            return false
        }

        getUsers(this.state.token, searchTerm).then( users => {
            this.setState({users: users})
        }).catch(error => {
            console.log('Error in fetching chat users')
        })
    }

    componentDidUpdate(props, state) {
        const { userId } = this.props.match.params 
        if(userId === undefined && userId !== props.match.params.userId) {
            // this.setState({ selectedUserId: undefined })
            this.setChatUser()
            console.log('aaaaa')
        } else if(userId !== undefined && userId !== props.match.params.userId) {
            console.log('bbbbb')
            this.setState({ selectedUserId: userId});
        } else if(userId && state.users !== this.state.users) {
            console.log('cccc')
            this.setState({ selectedUserId: userId});
        }
        
        // console.log(this.state.isMounted)
        this.socket.on('message', (data) => {
            
            if(data.length !== this.state.messages.length && this.state.messages !== state.message) {
                this.setState({messages: data})
            }
        })
    }

    getChatMessages = (userId) => {
        getChats(this.state.token, userId).then( chats => {
            this.setState({messages: chats})
        }).catch(error => {
            console.log('Error in fetching chats.')
        })
    }

    sendMessage = (message) => {
        this.socket.emit('sendMessage', message, (error, messages) => {
            if (error) {
                return console.log(error)
            }

            this.setState({ messages }, () => {
                this.setChatUser()
            })
        })
    }

    onUserSelect = (user) => {
        this.setState({selectedUser: user})
        this.setState({selectedUserId: user._id})
        this.getChatMessages(user._id)
    }

    renderMessageList = () => {
        if(!this.state.selectedUserId) {
            return <div></div>;
        }

        return (
            <MessageList 
                from={this.state.profile} 
                to={this.state.selectedUser}
                messages={this.state.messages}
                
            />
        )
    }

    renderChatForm = () => {
        if(!this.state.selectedUserId) {
            return <div></div>;
        }

        return (
            <ChatForm 
                token={this.state.token}
                from={this.state.profile} 
                to={this.state.selectedUserId}
                onSendMessage={this.sendMessage} />
        )
    }

    render() {
        return (
            <Layout>
                <div className="col-sm-9">
                        <div id="chat-container">
                            <Search searchUser={this.searchUser} />
                            <UserList 
                                selectedUserId={this.state.selectedUserId}
                                users={this.state.users} 
                                userSelect={this.onUserSelect}
                                loading={this.state.loading}
                            />
                            { this.renderMessageList() }
                            { this.renderChatForm()  } 
                        </div>
                </div>
            </Layout>



            // <Fragment>
            //     <Menu />
            //     <div className="chat-wrapper">
            //         <div id="chat-container">
            //             <Search searchUser={this.searchUser} />
            //             <UserList 
            //                 selectedUserId={this.state.selectedUserId}
            //                 users={this.state.users} 
            //                 userSelect={this.onUserSelect}
            //                 loading={this.state.loading}
            //             />
            //             { this.renderMessageList() }
            //             { this.renderChatForm()  } 
            //         </div>
            //     </div>                
            // </Fragment>
        );
    }
}

export default Chat;
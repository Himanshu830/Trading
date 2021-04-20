import React, { Component, Fragment } from 'react';
import { isAuthenticated } from "../auth/api";
import UserList from './UserList';
import Search from './Search';
import ChatForm from './ChatForm';
import { getUsers, getChats } from './apiChat';
import io from 'socket.io-client';
import MessageList from './MessageList';
import Menu from '../layout/partial/Menu';

// import './chat.css';

class Chat extends Component {
    state = { loading: false, token: null, search: '', profile: {}, users: [], selectedUserId: undefined, selectedUser: {}, messages: []}
    socket = io(process.env.REACT_APP_API_URL, {transports: ['websocket', 'polling', 'flashsocket']});

    componentDidMount() {
        const { token, user } = isAuthenticated();

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
            getUsers(token).then( users => {
                this.setState({users, loading: false})
            }).catch(error => {
                console.log('Error in fetching chat users')
            })
        });
        
        // this.setState({isMounted: true})
    }

    searchUser = (searchTerm) => {
        getUsers(this.state.token, searchTerm).then( users => {
            this.setState({users})
        }).catch(error => {
            console.log('Error in fetching chat users')
        })
    }

    componentDidUpdate(props, state) {
        const { userId } = this.props.match.params 
        if(userId === undefined && userId !== props.match.params.userId) {
            this.setState({ selectedUserId: undefined })
            console.log('aaaaa')
        } else if(userId !== undefined && userId !== props.match.params.userId) {
            console.log('bbbbb')
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

            this.setState({ messages })
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
        // return (
        //     <Layout className="chat-wrapper">
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
        //     </Layout>
        // );

        return (
            <Fragment>
                <Menu />
                <div className="chat-wrapper">
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
            </Fragment>
        );
    }
}

export default Chat;
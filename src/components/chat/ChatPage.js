import React from "react";
import { Link } from "react-router-dom";
// import moment from "moment";
import Layout from "../core/Layout";
import { isAuthenticated } from "../auth";

import UserList from './UserList';
import Search from './Search';
import MessageList from "./MessageList";
import ChatForm from './ChatForm';

import './chat.css';

const Chat = () => {

    const chatHtml = () => {
        return (
            <div id="chat-container">
                <Search />
                <UserList />
                <MessageList />
                <ChatForm />
            </div>
        );
    }

    return (
        <Layout className="chat-wrapper">
            {chatHtml()}
        </Layout>
    );
};

export default Chat;

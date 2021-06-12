import React, { Component, Fragment } from "react";
import User from './User';

class UserList extends Component {

    onUserSelect = (user) => {
        this.props.userSelect(user)
    }

    renderUserList = () => {
        const {users, loading} = this.props;

        if(loading) {  
            return 'Loading...'
        } else if(!users.length) {
            return (
                <div className="title-text" style={{padding: "25px", fontSize: "1.3rem"}}>User not found.</div>
            )
        }


        let selectedClass = '';
        return users.map( (user, index) => {
            let userId = user?.userId ? user.userId : user._id
            // selectedClass = user._id === this.props.selectedUserId ? 'active' : '';
            selectedClass = userId === this.props.selectedUserId ? 'active' : '';

            return <User 
                    key={ index } 
                    user={ user } 
                    selectedClass={ selectedClass }
                    onUserSelect={ this.onUserSelect }
                    />
        });
    };

    render() {
        return (
            <Fragment>
                <div id="conversation-list">
                    {this.renderUserList()}
                </div>

                <div id="new-message-container">
                </div>
            </Fragment>
        )
    }
}

export default UserList;
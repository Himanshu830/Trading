import React, { Component } from "react";
import { Link } from "react-router-dom";
import { SITE_URL } from "../../config";
import moment from 'moment';

class User extends Component {

    setUserName = (user) => {
        this.props.onUserSelect(user)
    }

    render() {
        const { user, selectedClass } = this.props

        // return (
        //     <div 
        //         className={`conversation ${selectedClass}`}
        //         onClick={() => this.setUserName(user)}
        //     >
        //         <img src="images/profiles/user_1.jpg" alt={user.name} />
        //         <div className="title-text"> {user.name} </div>
        //         <div className="created-date">
        //             Dec 18
        //         </div>
        //         <div className="conversation-message">
                    
        //         </div>
        //     </div>
        // );

        return (
            <Link 
                to={`/chat/${user._id}`}
                className={`conversation ${selectedClass}`}
                onClick={() => this.setUserName(user)}
            >
                <img src={ `${SITE_URL}/images/profiles/user_1.jpg` } alt={user.name} />
                <div className="title-text"> {user.name} </div>
                <div className="created-date">
                    { moment(user.createdAt).format('LT') }
                </div>
                <div className="conversation-message">
                    
                </div>
            </Link>
        );
    }
}

export default User;
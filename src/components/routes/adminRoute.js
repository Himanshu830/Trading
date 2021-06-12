import React from "react";
import { Route, Redirect } from "react-router-dom";
import { isAuthenticated } from "../auth/api";

const AdminRoute = ({ component: Component, ...rest }) => {
    const { user, token } = isAuthenticated();
    return (
        <Route
            {...rest}
            render={props =>
                user && user.role === 1 ? (
                    <Component {...props} user={user} token={token} />
                ) : (  
                    <Redirect
                        to={{
                            pathname: "/signin",
                            state: { from: props.location }
                        }}
                    />
                )
            }
        />
    )
}

export default AdminRoute;

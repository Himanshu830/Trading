import React from "react";
import { Route, Redirect } from "react-router-dom";
import { isAuthenticated } from "../auth/api";

const PrivateRoute = ({ component: Component, ...rest }) => {
    const { user, token } = isAuthenticated();

    return (
        <Route
            {...rest}
            render={props =>
                isAuthenticated() ? (
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
    );
}

export default PrivateRoute;

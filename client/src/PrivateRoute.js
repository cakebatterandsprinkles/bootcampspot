import React from 'react';
import { Route, Redirect } from 'react-router-dom';

 const PrivateRoute = ({ component: Component, ...rest }) => (
    <Route {...rest} render={props => {
        const currentUser = localStorage.currentUserToken;
        if (!currentUser) {
            // not logged in so redirect to login page with the return url
            return <Redirect to={{ pathname: '/signin', state: { from: props.location } }} />
        }

        // authorised so return component
        return <Component {...props} />
    }} />
)

export default PrivateRoute;
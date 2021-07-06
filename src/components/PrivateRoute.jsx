import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { authenticationService } from '../services/authentication';

export const PrivateRoute = ({ component: Component, ...rest }) => (
    <Route {...rest} render={props => {
        const currentUser = authenticationService.currentUser;
        if (!currentUser) {
            // not logged in so redirect to / page with the return url
            return <Redirect to={{ pathname: '/', state: { from: props.location } }} />
        }

        // authorised so return component
        return <Component {...props} />
    }} />
)
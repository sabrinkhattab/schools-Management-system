import React, { lazy } from 'react';
import { Switch, Redirect, Route } from 'react-router-dom';

const SignIn = lazy(() => import('./views/SignIn'));
const Dashboard = lazy(() => import('./views/Dashboard'));

const Routes = () => {

    return (
        <Switch>
            <Redirect exact from="/" to="/home" />
            <Route exact path="/sc/:school_url" component={SignIn}
            />
            <Route exact path="/sc/:schoolName/dashboard" component={Dashboard} />

            <Redirect to="/not-found" />
        </Switch>
    );
};

export default Routes;

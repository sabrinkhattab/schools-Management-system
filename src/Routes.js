import React, { lazy } from 'react';
import { Switch, Redirect, Route } from 'react-router-dom';
import { ResponsiveDrawer } from './layout'
const SignIn = lazy(() => import('./views/SignIn'));
const Dashboard = lazy(() => import('./views/Dashboard'));
const AddSchool = lazy(() => import('./views/AddSchool'));
const EditSchool = lazy(() => import('./views/EditSchool'));
const ViewSchool = lazy(() => import('./views/ViewSchool'));
const GroupsAndPermissions = lazy(() => import('./views/GroupsAndPermissions'));

const Routes = () => {

    return (
        <Switch>
            <Redirect exact from="/" to="/home" />
            <Route exact path="/sc/:school_url" component={SignIn}
            />
            <Route exact path="/sc/:schoolName/dashboard" component={Dashboard} />
            <Route exact path="/add-school"
                render={matchProps =>
                    <ResponsiveDrawer>
                        <AddSchool {...matchProps} />
                    </ResponsiveDrawer>
                }
            />
            <Route exact path="/sc/:schoolName/groups_permissions"
                render={matchProps =>
                    <ResponsiveDrawer>
                        <GroupsAndPermissions {...matchProps} />
                    </ResponsiveDrawer>
                }
            />
            <Route exact path="/view-school" component={ViewSchool} />
            <Route exact path="/edit-school" component={EditSchool} />
            <Redirect to="/not-found" />
        </Switch>
    );
};

export default Routes;

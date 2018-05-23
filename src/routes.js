import React from 'react';
import { Route, IndexRoute } from 'react-router';

//Components
import App from './components/App';
import EmployeeTableContainer from './containers/DashboardContainers/EmployeeTableContainer';

export default (
    <Route path="/" component={App}>
        <IndexRoute component={EmployeeTableContainer} />
    </Route>
);


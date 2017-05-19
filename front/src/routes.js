import React from 'react';
import { Router, Route } from 'react-router';

import App from './components/App/App';
import Home from './components/Home/Home';
import NotFound from './components/NotFound/NotFound'

const Routes = props => (
    <Router {...props}>
        <Route path='/' component={Home} />
        <Route path='/Game' component={App} />
        <Route path='*' component={NotFound} />
    </Router>
);

export default Routes;

import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter, Link, Router } from 'react-router-dom';
import App from 'App';
import store from 'shared/store';
import { createBrowserHistory } from 'history';
import { routes } from './config/routesConfigs';

const history = createBrowserHistory();
// history={history}

const Root = () => (
  <Provider store={store}>
    <BrowserRouter>
      <React.Fragment>
        {/*<ul>*/}
          {/*<li><Link to="/">home</Link></li>*/}
          {/*<li><Link to="/dashboards">dashboards</Link></li>*/}
        {/*</ul>*/}
        <App routes={routes} />
      </React.Fragment>
    </BrowserRouter>
  </Provider>
);

export default Root;

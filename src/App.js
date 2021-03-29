import React, { Suspense } from 'react';
import { Router } from 'react-router-dom';
import './assets/scss/index.scss'
import { createBrowserHistory } from 'history';
import { ThemeProvider } from '@material-ui/styles';
import { Provider } from 'react-redux';
import theme from './theme';
import store from './store';
import Routes from './Routes';
import { ToastProvider } from 'react-toast-notifications';



const browserHistory = createBrowserHistory();

function App() {
  return (
    // fallback={<Loader />}
    <Suspense fallback={<div>waiting...</div>}>
      <ToastProvider>
        <Provider store={store}>
          <ThemeProvider theme={theme}>
            <Router history={browserHistory}>
              <Routes />
            </Router>
          </ThemeProvider>
        </Provider>
      </ToastProvider>

    </Suspense>
  );
}

export default App;

import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import {Provider} from 'react-redux'
import {ThemeProvider} from '@material-ui/core/styles'
import theme from './theme'
import configureStore from './redux/ConfigureStore'

// Slices of state to be saved.
// Users as information for the user will need to persist across multiple components
// This will make it easy for us to access the user data at any point during the application between log in and log out
const store= configureStore({})

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <App />
      </ThemeProvider>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

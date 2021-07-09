import { StrictMode } from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import './index.css';
import { store } from './utils/store';
import * as serviceWorker from './serviceWorker';
import Routes from 'components/Routes';

ReactDOM.render(
  <StrictMode>
    <Provider store={store}>
      <Router>
        <Routes/>
      </Router>
    </Provider>
  </StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

import React, { Component } from 'react';
import { Provider } from 'react-redux';

import './css/App.css';
import NavigationBar from './components/NavigationBar';
import QueryPage from './components/QueryPage';
import store from './util/store';


class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <div className="app">
          <NavigationBar/>
          <QueryPage/>
        </div>
      </Provider>
    );
  }
}

export default App;

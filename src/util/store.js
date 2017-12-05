import { createStore, applyMiddleware, compose } from 'redux';
import thunkMiddleware from 'redux-thunk';

import reducers from '../reducers/index';

const enhancer = compose(
  applyMiddleware(
    thunkMiddleware // lets us dispatch() functions
  )
);

export default createStore(reducers, undefined, enhancer);

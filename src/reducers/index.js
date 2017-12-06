import { combineReducers } from 'redux';

import app from './app';
import results from './results';

const reducers = combineReducers({
  app,
  results
});

export default reducers;

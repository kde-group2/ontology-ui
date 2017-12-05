import { List } from 'immutable';

import QueryResult from '../records/QueryResult';
import actionTypes from '../constants/actionTypes';
import randomFlatColors from 'random-flat-colors';


const INITIAL_STATE = new List();

export default function results(state = INITIAL_STATE, { type, payload }) {
  switch (type) {
    case actionTypes.FETCHED_RESULTS: {
      if (!payload) {
        return new List();
      }

      return List(payload.map(r => {
        const colour = randomFlatColors();
        return new QueryResult({
          colour,
          ...r
        });
      }));
    }
    case actionTypes.REQUESTED_RESULTS: {
      return new List();
    }
    default: {
      return state;
    }
  }
}

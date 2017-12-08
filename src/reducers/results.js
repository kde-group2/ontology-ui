import { List } from 'immutable';

import actionTypes from '../constants/actionTypes';
import { convertToQueryResultRecord } from '../util/resultUtil';

const INITIAL_STATE = new List();

export default function results(state = INITIAL_STATE, { type, payload }) {
  switch (type) {
    case actionTypes.FETCHED_RESULTS: {
      if (!payload) {
        return new List();
      }

      return List(payload.map(r => convertToQueryResultRecord(r)));
    }
    case actionTypes.CHANEGED_QUESTION:
    case actionTypes.REQUESTED_RESULTS: {
      return new List();
    }
    default: {
      return state;
    }
  }
}

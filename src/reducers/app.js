import actionTypes from '../constants/actionTypes';

const INITIAL_STATE = {
  isLoading: false
};

export default function app(state = INITIAL_STATE, { type, payload }) {
  switch (type) {
    case actionTypes.FETCHED_RESULTS: {
      return {
        ...state,
        isLoading: false
      };
    }
    case actionTypes.REQUESTED_RESULTS: {
      return {
        ...state,
        isLoading: true
      };
    }
    default: {
      return state;
    }
  }
}

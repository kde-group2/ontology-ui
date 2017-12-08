import actionTypes from '../constants/actionTypes';
import HousingApi from '../api/HousingApi';

const housingApi = new HousingApi();

const fetchedResults = (payload) => ({
  type: actionTypes.FETCHED_RESULTS,
  payload
});

const requestedResults = () => ({
  type: actionTypes.REQUESTED_RESULTS
});

export const fetchHouseholdsAndPersonsByAccommodationType = (type) => {
  return dispatch => {
    dispatch(requestedResults());
    return housingApi.getHouseholdsAndPersonsByAccomodationType(type).then(response => {
      dispatch(fetchedResults(response));
    }).catch(error => console.log('[API ERROR]', error));
  };
};

export const fetchHouseholdsAndPersonsByCountyAndType = (type, county) => {
  return dispatch => {
    dispatch(requestedResults());
    return housingApi.getHouseholdsAndPersonsByCountyAndType(type, county).then(response => {
      dispatch(fetchedResults(response));
    }).catch(error => console.log('[API ERROR]', error));
  };
};

export const fetchHouseholdsByCountyByAccType = (type, county, above) => {
  return dispatch => {
    dispatch(requestedResults());
    return housingApi.getHouseholdsByCountyByAccType(type, county, above).then(response => {
      dispatch(fetchedResults(response));
    }).catch(error => console.log('[API ERROR]', error));
  };
};

export const fetchPersonsByCountyByAccType = (type, county, above) => {
  return dispatch => {
    dispatch(requestedResults());
    return housingApi.getPersonsByCountyByAccType(type, county, above).then(response => {
      dispatch(fetchedResults(response));
    }).catch(error => console.log('[API ERROR]', error));
  };
};

export const changedQuestion = () => {
  return dispatch => {
    return dispatch({
      type: actionTypes.CHANEGED_QUESTION
    });
  };
};

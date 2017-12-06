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
}

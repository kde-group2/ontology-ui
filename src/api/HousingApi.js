import Api from './Api';

class HousingApi extends  Api {
  getHouseholdsAndPersonsByAccomodationType(acctype) {
    return this.get('household/persons/byacctype', {
      acctype
    });
  }
}

export default HousingApi;

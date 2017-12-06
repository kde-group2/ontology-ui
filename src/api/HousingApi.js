import Api from './Api';

class HousingApi extends  Api {
  getHouseholdsAndPersonsByAccomodationType(acctype) {
    return this.get('household/persons/byacctype', {
      acctype
    });
  }

  getHouseholdsAndPersonsByCountyAndType(acctype, county) {
    return this.get('household/persons/bycounty/byacctype', {
      acctype,
      county
    });
  }
}

export default HousingApi;

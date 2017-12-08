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

  getHouseholdsByCountyByAccType(acctype, county, above) {
    return this.get('household/bycounty/byacctype', {
      above,
      acctype,
      county
    });
  }

  getPersonsByCountyByAccType(acctype, county, above) {
    return this.get('persons/bycounty/byacctype', {
      above,
      acctype,
      county
    });
  }
}

export default HousingApi;

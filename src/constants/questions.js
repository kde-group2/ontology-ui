import * as actions from '../actions/index';

export const OPTIONS = {
  COUNTY: 'COUNTY',
  NUMBER_FILTER: 'NUMBER_FILER',
  TYPE: 'TYPE'
};

export const RESULTS = {
  HOUSEHOLDS: 'HOUSEHOLDS',
  PERSONS: 'PERSONS'
};

export const QUESTIONS = [
  {
    text: 'Households and Population for Accommodation Type',
    fields: [OPTIONS.TYPE],
    results: [OPTIONS.COUNTY, RESULTS.HOUSEHOLDS, RESULTS.PERSONS],
    action: actions.fetchHouseholdsAndPersonsByAccommodationType
  },
  {
    text: 'Households and Population for Accommodation Type and County',
    fields: [OPTIONS.TYPE, OPTIONS.COUNTY],
    results: [RESULTS.HOUSEHOLDS, RESULTS.PERSONS]
  },
  {
    text: 'Households for Accommodation Type and County',
    fields: [OPTIONS.TYPE, OPTIONS.COUNTY],
    results: [RESULTS.HOUSEHOLDS]
  },
  {
    text: 'Persons for Accommodation Type and County',
    fields: [OPTIONS.TYPE, OPTIONS.COUNTY],
    results: [RESULTS.PERSONS]
  },
  {
    text: 'Persons for County',
    fields: [OPTIONS.COUNTY],
    results: [OPTIONS.TYPE, RESULTS.PERSONS]
  },
  {
    text: 'Households for County',
    fields: [OPTIONS.TYPE, OPTIONS.COUNTY],
    results: [OPTIONS.TYPE, RESULTS.HOUSEHOLDS]
  },
  {
    text: 'Persons for Accommodation Type',
    fields: [OPTIONS.TYPE],
    results: [OPTIONS.COUNTY, RESULTS.PERSONS]
  },
  {
    text: 'Households for Accommodation Type',
    fields: [OPTIONS.TYPE],
    results: [OPTIONS.COUNTY, RESULTS.HOUSEHOLDS]
  },
  {
    text: 'Households for Accommodation Type above range',
    fields: [OPTIONS.TYPE, OPTIONS.NUMBER_FILTER],
    results: [OPTIONS.COUNTY, RESULTS.HOUSEHOLDS]
  }
];

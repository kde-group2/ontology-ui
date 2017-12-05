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
    text: 'Q1: Households and Persons',
    fields: [OPTIONS.TYPE],
    results: [OPTIONS.COUNTY, RESULTS.HOUSEHOLDS, RESULTS.PERSONS],
    action: actions.fetchHouseholdsAndPersonsByAccommodationType
  },
  {
    text: 'Q2: Households and Persons',
    fields: [OPTIONS.TYPE, OPTIONS.COUNTY],
    results: [RESULTS.HOUSEHOLDS, RESULTS.PERSONS]
  },
  {
    text: 'Q3: Households',
    fields: [OPTIONS.TYPE, OPTIONS.COUNTY],
    results: [RESULTS.HOUSEHOLDS]
  },
  {
    text: 'Q4: Persons',
    fields: [OPTIONS.TYPE, OPTIONS.COUNTY],
    results: [RESULTS.PERSONS]
  },
  {
    text: 'Q5: Persons',
    fields: [OPTIONS.COUNTY],
    results: [OPTIONS.TYPE, RESULTS.PERSONS]
  },
  {
    text: 'Q6: Households',
    fields: [OPTIONS.TYPE, OPTIONS.COUNTY],
    results: [OPTIONS.TYPE, RESULTS.HOUSEHOLDS]
  },
  {
    text: 'Q7: Persons',
    fields: [OPTIONS.TYPE],
    results: [OPTIONS.COUNTY, RESULTS.PERSONS]
  },
  {
    text: 'Q8: Households',
    fields: [OPTIONS.TYPE],
    results: [OPTIONS.COUNTY, RESULTS.HOUSEHOLDS]
  },
  {
    text: 'Q9: Households',
    fields: [OPTIONS.TYPE, OPTIONS.NUMBER_FILTER],
    results: [OPTIONS.COUNTY, RESULTS.HOUSEHOLDS]
  }
];

export const OPTIONS = {
  COUNTY: 'COUNTY',
  NUMBER_FILTER: 'NUMBER_FILER',
  TYPE: 'TYPE'
};

export const RESULTS = {
  HOUSEHOLDS: 'HOUSEHOLDS',
  PERSONS: 'PERSONS'
};

export const QUESTIONS = {
  Q1: {
    text: 'Households and Persons',
    fields: [OPTIONS.TYPE],
    results: [OPTIONS.COUNTY, RESULTS.HOUSEHOLDS, RESULTS.PERSONS],
  },
  Q2: {
    text: 'Households and Persons',
    fields: [OPTIONS.TYPE, OPTIONS.COUNTY],
    results: [RESULTS.HOUSEHOLDS, RESULTS.PERSONS]
  },
  Q3: {
    text: 'Households',
    fields: [OPTIONS.TYPE, OPTIONS.COUNTY],
    results: [RESULTS.HOUSEHOLDS]
  },
  Q4: {
    text: 'Persons',
    fields: [OPTIONS.TYPE, OPTIONS.COUNTY],
    results: [RESULTS.PERSONS]
  },
  Q5: {
    text: 'Persons',
    fields: [OPTIONS.COUNTY],
    results: [OPTIONS.TYPE, RESULTS.PERSONS]
  },
  Q6: {
    text: 'Households',
    fields: [OPTIONS.COUNTY],
    results: [OPTIONS.TYPE, RESULTS.HOUSEHOLDS]
  },
  Q7: {
    text: 'Persons',
    fields: [OPTIONS.TYPE],
    results: [OPTIONS.COUNTY, RESULTS.PERSONS]
  },
  Q8: {
    text: 'Households',
    fields: [OPTIONS.TYPE],
    results: [OPTIONS.COUNTY, RESULTS.HOUSEHOLDS]
  },
  Q9: {
    text: 'Households',
    fields: [OPTIONS.TYPE, OPTIONS.NUMBER_FILTER],
    results: [OPTIONS.COUNTY, RESULTS.HOUSEHOLDS]
  },
  Q10: {
    text: 'Persons',
    fields: [OPTIONS.TYPE, OPTIONS.NUMBER_FILTER],
    results: [OPTIONS.COUNTY, RESULTS.PERSONS]
  }
};

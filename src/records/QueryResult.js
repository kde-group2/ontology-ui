import { List, Record } from 'immutable';

const QueryResult = Record({
  accommodationType: undefined,
  area: undefined,
  coordinates: new List(),
  colour: undefined,
  county: undefined,
  households: undefined,
  id: undefined,
  persons: undefined
}, 'QueryResult');

export default QueryResult;

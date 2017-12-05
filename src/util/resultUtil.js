import randomFlatColors from 'random-flat-colors';
import { computeArea } from 'spherical-geometry-js'

import QueryResult from '../records/QueryResult';

const EARTHS_RADIUS_KM = 6371;

export const convertToQueryResultRecord = (recordData) => {
  const coordinates = recordData.coordinates.map(c => {
    return { lat: c.lattitude, lng: c.longitude };
  });

  return new QueryResult({
    ...recordData,
    area: computeArea(coordinates, EARTHS_RADIUS_KM),
    coordinates,
    colour: randomFlatColors(),
  });
};

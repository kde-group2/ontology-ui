import React, { Component } from 'react';
import { withScriptjs, withGoogleMap, GoogleMap, InfoWindow, Polygon } from 'react-google-maps';
import PropTypes from 'prop-types';
import { List } from 'immutable';

import mapStyle from '../constants/mapStyle';
import FILL_CONFIG from '../constants/mapStyle';

// config related
const DEFAULT_MAP_ZOOM = 7;
const DEFAULT_MAP_LATTITUDE = 53.3942442;
const DEFAULT_MAP_LONGITUDE = -7.6338757;

class Map extends Component {

  static propTypes = {
    results: PropTypes.instanceOf(List).isRequired
  };

  constructor(props) {
    super(props);

    this.setCurrentCounty = this.setCurrentCounty.bind(this);
    this.renderInfoBox = this.renderInfoBox.bind(this);
    this.state = {
      currentCounty: null
    };
  }


  setCurrentCounty(currentCounty) {
    this.setState({
      currentCounty
    });
  }

  renderPolygons(results) {
    if (!results) {
      return null;
    }

    const { currentCounty } = this.state;

    return results.map(result => {
      const fillColor = currentCounty !== result ? result.colour : FILL_CONFIG.COLOUR_UPPER;
      const fillOpacity = currentCounty !== result ? FILL_CONFIG.OPACITY_LOWER : FILL_CONFIG.OPACITY_UPPER;

      const options = {
        fillColor,
        fillOpacity,
        strokeOpacity: 0.0
      };

      return (
        <Polygon
          draggable={false}
          key={result.id}
          onClick={() => this.setCurrentCounty(result)}
          path={result.coordinates} options={options}
        />
      );
    });
  }

  renderInfoBox(currentCounty) {
    if (!currentCounty) {
      return null;
    }

    const averageLat = currentCounty.coordinates.reduce( ( p, c ) => p + c.lat, 0 ) / currentCounty.coordinates.length;
    const averageLng = currentCounty.coordinates.reduce( ( p, c ) => p + c.lng, 0 ) / currentCounty.coordinates.length;

    return (
      <InfoWindow
        position={{ lat: averageLat, lng: averageLng }}
        onCloseClick={() => this.setCurrentCounty(null)}
      >
        <div className="map-info-box">
          <h5>{currentCounty.county}</h5>
          {currentCounty.accommodationType && <span>Accommodation Type: <b>{currentCounty.accommodationType}</b></span>}
          {currentCounty.households && <span>Households: <b>{currentCounty.households}</b></span>}
          {currentCounty.persons && <span>Persons: <b>{currentCounty.persons}</b></span>}
          {currentCounty.persons && currentCounty.households && <span>Persons/Household: <b>{(currentCounty.persons/currentCounty.households).toFixed(2)}</b></span>}
        </div>
      </InfoWindow>
    );
  }

  render() {
    const { results } = this.props;
    const { currentCounty } = this.state;

    return (
      <GoogleMap
        defaultZoom={DEFAULT_MAP_ZOOM}
        defaultCenter={{lat: DEFAULT_MAP_LATTITUDE, lng: DEFAULT_MAP_LONGITUDE}}
        defaultOptions={{ styles: mapStyle }}
      >
        {this.renderPolygons(results)}
        {this.renderInfoBox(currentCounty)}
      </GoogleMap>
    );
  }
}

export default withScriptjs(withGoogleMap(Map));

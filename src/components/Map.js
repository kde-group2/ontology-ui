import React, { Component } from 'react';
import { withScriptjs, withGoogleMap, GoogleMap, InfoWindow, Polygon } from 'react-google-maps';
import PropTypes from 'prop-types';
import { List } from 'immutable';

import mapStyle from '../constants/mapStyle';
import COUNTIES from '../constants/counties';
import ACCOMMODATION_TYPES from '../constants/accommodationTypes';

class Map extends Component {

  static propTypes = {
    results: PropTypes.instanceOf(List).isRequired,
    selectedAccommodationType: PropTypes.string,
    selectedCounty: PropTypes.string,
    selectedQuestion: PropTypes.object
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
      const fillColor = currentCounty !== result ? result.colour : '#446CB3';
      const fillOpacity = currentCounty !== result ? 0.65 : 0.85;

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

  renderInfoBox(currentCounty, selectedCounty, selectedAccommodationType) {
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
          <h5>{currentCounty.county || COUNTIES[selectedCounty]}</h5>
          {selectedAccommodationType && <p>For type: <b>{ACCOMMODATION_TYPES[selectedAccommodationType]}</b></p>}
          {currentCounty.accommodationType && <span>Accommodation Type: <b>{currentCounty.accommodationType}</b></span>}
          {currentCounty.households && <span>Households: <b>{currentCounty.households}</b></span>}
          {currentCounty.persons && <span>Persons: <b>{currentCounty.persons}</b></span>}
          {currentCounty.persons && currentCounty.households && <span>Persons/Household: <b>{(currentCounty.persons/currentCounty.households).toFixed(2)}</b></span>}
        </div>
      </InfoWindow>
    );
  }

  render() {
    const { results, selectedCounty, selectedAccommodationType, selectedQuestion } = this.props;
    const { currentCounty } = this.state;

    return (
      <GoogleMap
        defaultZoom={7}
        defaultCenter={{ lat: 53.3942442, lng:-7.6338757 }}
        defaultOptions={{ styles: mapStyle }}
      >
        {this.renderPolygons(results)}
        {this.renderInfoBox(currentCounty, selectedCounty, selectedAccommodationType)}
      </GoogleMap>
    );
  }
}

export default withScriptjs(withGoogleMap(Map));

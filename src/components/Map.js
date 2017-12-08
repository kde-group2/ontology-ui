import React, { Component } from 'react';
import { withScriptjs, withGoogleMap, GoogleMap, InfoWindow, Polygon } from 'react-google-maps';
import { Table } from 'reactstrap';
import PropTypes from 'prop-types';
import { List } from 'immutable';

import mapStyle from '../constants/mapStyle';
import COUNTIES from '../constants/counties';
import ACCOMMODATION_TYPES from '../constants/accommodationTypes';
import { OPTIONS } from '../constants/questions';
import FILL_CONFIG from '../constants/mapStyle';
import ResultsTable from "./ResultsTable";

const DEFAULT_MAP_ZOOM = 7;
const DEFAULT_MAP_LATITUDE = 53.3942442;
const DEFAULT_MAP_LONGITUDE = -7.6338757;

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

  componentWillReceiveProps(nextProps) {
    if (nextProps.results.size !== this.props.results.size) {
      this.setCurrentCounty(null);
    }
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

  renderInfoBoxContent(currentCounty, selectedCounty, selectedAccommodationType, selectedQuestion, results) {
    if (selectedQuestion.fields.includes(OPTIONS.COUNTY)) {
      return (
        <div>
          {selectedQuestion.fields.includes(OPTIONS.TYPE) && <p>{ACCOMMODATION_TYPES[selectedAccommodationType]}</p>}
          <ResultsTable results={results} selectedQuestion={selectedQuestion} size="sm" />
        </div>
      );
    }

    return (
      <Table hover size="sm">
        <tbody>
        {selectedQuestion.fields.includes(OPTIONS.TYPE) && <tr><td>Accommodation Type</td><td>{ACCOMMODATION_TYPES[selectedAccommodationType]}</td></tr>}
        {currentCounty.accommodationType && <tr><td>Accommodation Type</td><td>{currentCounty.accommodationType}</td></tr>}
        {currentCounty.households && <tr><td>Households</td><td>{currentCounty.households}</td></tr>}
        {currentCounty.persons && <tr><td>Persons</td><td>{currentCounty.persons}</td></tr>}
        {currentCounty.area && <tr><td>Area</td><td>{parseInt(currentCounty.area, 0)}km&sup2;</td></tr>}
        {currentCounty.persons && currentCounty.households && <tr><td>Avg Persons/Household</td><td>{(currentCounty.persons/currentCounty.households).toFixed(2)}</td></tr>}
        {currentCounty.households && <tr><td>Num. Household Type/km&sup2;</td><td>{(currentCounty.households/currentCounty.area).toFixed(4)}</td></tr>}
        </tbody>
      </Table>
    );
  }

  renderInfoBox(currentCounty, selectedCounty, selectedAccommodationType, selectedQuestion, results) {
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
          {this.renderInfoBoxContent(currentCounty, selectedCounty, selectedAccommodationType, selectedQuestion, results)}
        </div>
      </InfoWindow>
    );
  }

  render() {
    const { results, selectedCounty, selectedAccommodationType, selectedQuestion } = this.props;
    const { currentCounty } = this.state;

    return (
      <GoogleMap
        defaultZoom={DEFAULT_MAP_ZOOM}
        defaultCenter={{lat: DEFAULT_MAP_LATITUDE, lng: DEFAULT_MAP_LONGITUDE}}
        defaultOptions={{ styles: mapStyle }}
      >
        {this.renderPolygons(results)}
        {this.renderInfoBox(currentCounty, selectedCounty, selectedAccommodationType, selectedQuestion, results)}
      </GoogleMap>
    );
  }
}

export default withScriptjs(withGoogleMap(Map));

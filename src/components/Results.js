import React, { Component } from 'react';
import { Col, Container, Row } from 'reactstrap';
import { connect } from 'react-redux';
import { List } from 'immutable';
import PropTypes from 'prop-types';

import Map from './Map';
import loader from '../imgs/loader.gif';
import ResultsTable from "./ResultsTable";

class Results extends Component {

  static propTypes = {
    isLoading: PropTypes.bool.isRequired,
    results: PropTypes.instanceOf(List).isRequired,
    selectedAccommodationType: PropTypes.string,
    selectedCounty: PropTypes.string,
    selectedQuestion: PropTypes.object
  };

  renderLoadingWrapper(isLoading, results) {
    if (!isLoading && !results.isEmpty()) {
      return false;
    }

    return (
      <Row className="loading-wrapper">
        <Col>
          {isLoading && <img src={loader} className="loader" alt="Loading" />}
          {!isLoading && results.isEmpty() && <p className="text-center">Select all of the options above to perform a query</p>}
        </Col>
      </Row>
    );
  }

  render() {
    const { isLoading, results, selectedAccommodationType, selectedCounty, selectedQuestion } = this.props;

    if (!selectedQuestion) {
      return null;
    }

    return (
      <div>
        <Container className="results-section">
          <Row className="result-table">
            <Col>
              <ResultsTable
                results={results}
                selectedQuestion={selectedQuestion}
              />
            </Col>
          </Row>
          {this.renderLoadingWrapper(isLoading, results)}
        </Container>
        <Container fluid>
          <Row className="map">
            <Map
              googleMapURL="https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=AIzaSyBvsmTEorHgAhZecTOJL2813cJIH1cINE4"
              loadingElement={<div style={{ height: `100%` }} >Loading</div>}
              containerElement={<div style={{ height: `100vh`, width: `100vw` }} />}
              mapElement={<div style={{ height: `100%` }} />}
              results={results}
              selectedCounty={selectedCounty}
              selectedAccommodationType={selectedAccommodationType}
              selectedQuestion={selectedQuestion}
            />
          </Row>
        </Container>
      </div>
    );
  }
}

const mapStateToProps = ({ app: { isLoading }, results }) => {
  return {
    isLoading,
    results
  };
};

export default connect(mapStateToProps)(Results);

import React, { Component } from 'react';
import { Col, Container, Row, Table } from 'reactstrap';
import { connect } from 'react-redux';
import { List } from 'immutable';
import PropTypes from 'prop-types';

import Map from './Map';
import { OPTIONS, RESULTS,  QUESTIONS } from '../constants/questions';
import loader from '../imgs/loader.gif';

class Results extends Component {

  static propTypes = {
    isLoading: PropTypes.bool.isRequired,
    results: PropTypes.instanceOf(List).isRequired,
    selectedQuestion: PropTypes.object
  };

  renderTableHeaderItems(selectedQuestion) {
    const { results } = selectedQuestion;

    return (
      <tr>
        <th>#</th>
        {results.includes(OPTIONS.COUNTY) && <th>County</th>}
        {results.includes(OPTIONS.TYPE) && <th>Accommodation Type</th>}
        {results.includes(RESULTS.HOUSEHOLDS) && <th>Num. Households</th>}
        {results.includes(RESULTS.PERSONS) && <th>Num. Persons</th>}
        {results.includes(RESULTS.HOUSEHOLDS) && results.includes(RESULTS.PERSONS) && <th>Avg Persons/Household</th>}
        <th>Area (km sq.)</th>
      </tr>
    );
  }

  renderTableResultItems(queryResults, selectedQuestion) {
    const { results } = selectedQuestion;

    if (!queryResults || queryResults.isEmpty()) {
      return null;
    }

    return queryResults.map((result, i) => {
      return (
        <tr key={i}>
          <th>{i + 1}</th>
          {results.includes(OPTIONS.COUNTY) && <th>{result.county}</th>}
          {results.includes(OPTIONS.TYPE) && <th>{result.accommodationType}</th>}
          {results.includes(RESULTS.HOUSEHOLDS) && <th>{result.households}</th>}
          {results.includes(RESULTS.PERSONS) && <th>{result.persons}</th>}
          {results.includes(RESULTS.HOUSEHOLDS) && results.includes(RESULTS.PERSONS) && <th>{(result.persons/result.households).toFixed(2)}</th>}
          <th>{parseInt(result.area, 0)}</th>
        </tr>
      );
    });
  }

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
    const { isLoading, results, selectedQuestion } = this.props;
    console.log('Loading', isLoading);

    if (!selectedQuestion) {
      return null;
    }

    return (
      <div>
        <Container className="results-section">
          <Row className="result-table">
            <Col>
             <Table>
               <thead>
                  {this.renderTableHeaderItems(selectedQuestion)}
               </thead>
                 <tbody>
                   {this.renderTableResultItems(results, selectedQuestion)}
                 </tbody>
             </Table>
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
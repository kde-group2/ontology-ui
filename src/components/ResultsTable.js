import React, { Component } from 'react';
import { Table } from 'reactstrap';
import { List } from 'immutable';
import PropTypes from 'prop-types';

import { OPTIONS, RESULTS } from '../constants/questions';

class ResultsTable extends Component {

  static propTypes = {
    results: PropTypes.instanceOf(List).isRequired,
    selectedQuestion: PropTypes.object,
    size: PropTypes.string.isRequired
  };

  static defaultProps = {
    size: 'lg'
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
        <th>Area (km&sup2;)</th>
        {results.includes(RESULTS.HOUSEHOLDS) && <th>Num. Household Type/km&sup2;</th>}
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
          {results.includes(RESULTS.HOUSEHOLDS) && <th>{(result.households/result.area).toFixed(4)}</th>}
        </tr>
      );
    });
  }

  render() {
    const { results, selectedQuestion, size } = this.props;

    return (
      <Table hover size={size}>
        <thead>
        {this.renderTableHeaderItems(selectedQuestion)}
        </thead>
        <tbody>
        {this.renderTableResultItems(results, selectedQuestion)}
        </tbody>
      </Table>
    );
  }
}

export default ResultsTable;

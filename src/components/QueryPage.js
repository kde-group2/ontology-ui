import React, { Component } from 'react';
import { Col, Container, Dropdown, DropdownToggle, DropdownMenu, DropdownItem, FormGroup, Label, Input, Row } from 'reactstrap';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';

import {
  fetchHouseholdsAndPersonsByAccommodationType
} from '../actions';
import ACCOMMODATION_TYPES from '../constants/accommodationTypes';
import COUNTIES from '../constants/counties';
import { OPTIONS, QUESTIONS } from '../constants/questions';
import Results from './Results';

class QueryPage extends Component {

  static propTypes = {
    fetchHouseholdsAndPersonsByAccommodationType: PropTypes.func.isRequired
  };

  constructor(props) {
    super(props);

    this.fetchQuery = this.fetchQuery.bind(this);
    this.selectAccommodationType = this.selectAccommodationType.bind(this);
    this.selectCounty = this.selectCounty.bind(this);
    this.selectQuestion = this.selectQuestion.bind(this);
    this.toggle = this.toggle.bind(this);
    this.state = {
      dropdownOpen: false,
      selectedAccommodationType: null,
      selectedCounty: null,
      selectedQuestion: QUESTIONS[0]
    };
  }

  toggle() {
    this.setState({
      dropdownOpen: !this.state.dropdownOpen
    });
  }

  fetchQuery() {
    const { selectedAccommodationType, selectedCounty, selectedQuestion } = this.state;

    if (selectedQuestion) {
      const { fields } = selectedQuestion;
      if ((fields.includes(OPTIONS.COUNTY) && selectedCounty)
          && (fields.includes(OPTIONS.TYPE) && selectedAccommodationType)) {
        console.log('Not Making a network request');
      } else {
        const requestFunction = this.props[selectedQuestion.action.name];
        requestFunction(selectedAccommodationType);
      }
    }

  }

  selectQuestion(selectedQuestion) {
    this.setState({
      selectedQuestion
    });
  }

  selectCounty({target: { value: selectedCounty } }) {
    this.setState({
      selectedCounty
    }, this.fetchQuery);
  }

  selectAccommodationType({target: { value: selectedAccommodationType } }) {
    this.setState({
      selectedAccommodationType
    }, this.fetchQuery);
  }

  renderQuestions(questions) {
    return questions.map((question, i) => {
      return <DropdownItem key={i} onClick={() => this.selectQuestion(question)}>Q{i+1}: {question.text}</DropdownItem>
    });
  }

  renderCounties(counties) {
    return Object.keys(counties).map((county) => {
      return <option key={county} value={county}>{COUNTIES[county]}</option>
    });
  }

  renderAccommodationTypes(types) {
    return Object.keys(types).map((type) => {
      return <option key={type} value={type}>{ACCOMMODATION_TYPES[type]}</option>
    });
  }

  renderCountyDropdown(selectedQuestion, selectedCounty) {
    if (!selectedQuestion || selectedQuestion.fields.indexOf(OPTIONS.COUNTY) < 0) {
      return null;
    }

    return (
      <Col xs="12" sm="6" md="4">
        <FormGroup>
          <Label for="county">County</Label>
          <Input type="select" defaultValue={selectedCounty} onChange={this.selectCounty}>
            <option disabled selected>Select a county</option>
            {this.renderCounties(COUNTIES)}
          </Input>
        </FormGroup>
      </Col>
    );
  }

  renderAccommodationTypesDropdown(selectedQuestion, selectedAccommodationType) {
    if (!selectedQuestion || selectedQuestion.fields.indexOf(OPTIONS.TYPE) < 0) {
      return null;
    }

    return (
      <Col xs="12" sm="6" md="4">
        <FormGroup>
          <Label for="county">Accommodation Type</Label>
          <Input type="select" defaultValue={selectedAccommodationType} onChange={this.selectAccommodationType}>
            <option disabled selected>Select a type</option>
            {this.renderAccommodationTypes(ACCOMMODATION_TYPES)}
          </Input>
        </FormGroup>
      </Col>
    );
  }

  render() {
    const { selectedAccommodationType, selectedCounty, selectedQuestion } = this.state;
    const dropdownText = selectedQuestion ? selectedQuestion.text : 'Choose a Query';

    return (
      <div>
        <Container className="query-page">
          <Row>
            <Dropdown isOpen={this.state.dropdownOpen} toggle={this.toggle}>
              <DropdownToggle caret>
                {dropdownText}
              </DropdownToggle>
              <DropdownMenu>
                {this.renderQuestions(QUESTIONS)}
              </DropdownMenu>
            </Dropdown>
          </Row>
          <br />
          <Row>
            {this.renderCountyDropdown(selectedQuestion, selectedCounty)}
            {this.renderAccommodationTypesDropdown(selectedQuestion, selectedAccommodationType)}
          </Row>
        </Container>
        <Results selectedQuestion={selectedQuestion} />
      </div>
    );
  }
}

const mapStateToProps = () => {
  return {

  };
};

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    fetchHouseholdsAndPersonsByAccommodationType
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(QueryPage);

import React, { Component } from 'react';
import { Col, Container, Dropdown, DropdownToggle, DropdownMenu, DropdownItem, FormGroup, Input, Row } from 'reactstrap';
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
    this.changeFilterValue = this.changeFilterValue.bind(this);
    this.selectAccommodationType = this.selectAccommodationType.bind(this);
    this.selectCounty = this.selectCounty.bind(this);
    this.selectQuestion = this.selectQuestion.bind(this);
    this.toggle = this.toggle.bind(this);
    this.state = {
      currentFilterValue: undefined,
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

  changeFilterValue({target: { value: currentFilterValue } }) {
    this.setState({
      currentFilterValue
    }, this.fetchQuery);
  }

  renderQuestions(questions) {
    return questions.map((question, i) => {
      let text = question.text;
      text = question.fields.includes(OPTIONS.TYPE) ? `${text} for [Accommodation Type]` : text;
      text = question.fields.includes(OPTIONS.COUNTY) ? `${text} in [County]` : text;
      text = question.fields.includes(OPTIONS.NUMBER_FILTER) ? `${text} above [X]` : text;
      return <DropdownItem key={i} onClick={() => this.selectQuestion(question)}>{text}</DropdownItem>
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
    if (!selectedQuestion || !selectedQuestion.fields.includes(OPTIONS.COUNTY)) {
      return null;
    }

    return (
      <Col md="3">
        <Row>
          <Col xs="2" className="options-for">
            <p>in</p>
          </Col>
          <Col xs="10">
            <FormGroup>
              <Input type="select" defaultValue={selectedCounty} onChange={this.selectCounty}>
                <option disabled selected>County</option>
                {this.renderCounties(COUNTIES)}
              </Input>
            </FormGroup>
          </Col>
        </Row>
      </Col>
    );
  }

  renderAccommodationTypesDropdown(selectedQuestion, selectedAccommodationType) {
    if (!selectedQuestion || !selectedQuestion.fields.includes(OPTIONS.TYPE)) {
      return null;
    }

    return (
      <Col md="3">
        <Row>
          <Col xs="2" className="options-for">
            <p>for</p>
          </Col>
          <Col xs="10">
            <FormGroup>
              <Input type="select" defaultValue={selectedAccommodationType} onChange={this.selectAccommodationType}>
                <option disabled selected>Accommodation Type</option>
                {this.renderAccommodationTypes(ACCOMMODATION_TYPES)}
              </Input>
            </FormGroup>
          </Col>
        </Row>
      </Col>
    );
  }

  renderNumberFilter(selectedQuestion, currentFilterValue) {
    if (!selectedQuestion || !selectedQuestion.fields.includes(OPTIONS.NUMBER_FILTER)) {
      return null;
    }

    return (
      <Col md="3">
        <Row>
          <Col xs="2" className="options-for">
            <p>above</p>
          </Col>
          <Col xs={{ size: 6, offset: 1 }}>
            <FormGroup>
              <Input type="number" value={currentFilterValue} placeholder="1000" onChange={this.changeFilterValue} />
            </FormGroup>
          </Col>
        </Row>
      </Col>
    );
  }

  render() {
    const { currentFilterValue, selectedAccommodationType, selectedCounty, selectedQuestion } = this.state;
    const dropdownText = selectedQuestion ? selectedQuestion.text : 'Choose a Query';

    return (
      <div>
        <Container className="query-page">
          <Row>
            <Col md="auto">
              <Dropdown isOpen={this.state.dropdownOpen} toggle={this.toggle}>
                <DropdownToggle caret>
                  {dropdownText}
                </DropdownToggle>
                <DropdownMenu>
                  {this.renderQuestions(QUESTIONS)}
                </DropdownMenu>
              </Dropdown>
            </Col>
            {this.renderAccommodationTypesDropdown(selectedQuestion, selectedAccommodationType)}
            {this.renderCountyDropdown(selectedQuestion, selectedCounty)}
            {this.renderNumberFilter(selectedQuestion, currentFilterValue)}
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

import React, { Component } from 'react';
import { Col, Container, Dropdown, DropdownToggle, DropdownMenu, DropdownItem, FormGroup, Input, Row } from 'reactstrap';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';

import {
  changedQuestion,
  fetchHouseholdsAndPersonsByAccommodationType,
  fetchHouseholdsAndPersonsByCountyAndType,
  fetchHouseholdsByCountyByAccType,
  fetchPersonsByCountyByAccType,
} from '../actions';
import ACCOMMODATION_TYPES from '../constants/accommodationTypes';
import COUNTIES from '../constants/counties';
import { OPTIONS, QUESTIONS, RESULTS } from '../constants/questions';
import Results from './Results';

const QUESTION_KEYS = Object.keys(QUESTIONS);

class QueryPage extends Component {

  static propTypes = {
    changedQuestion: PropTypes.func.isRequired,
    fetchHouseholdsAndPersonsByAccommodationType: PropTypes.func.isRequired,
    fetchHouseholdsAndPersonsByCountyAndType: PropTypes.func.isRequired,
    fetchHouseholdsByCountyByAccType: PropTypes.func.isRequired,
    fetchPersonsByCountyByAccType: PropTypes.func.isRequired,
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
      selectedQuestion: QUESTIONS[QUESTION_KEYS[0]]
    };
  }

  toggle() {
    this.setState({
      dropdownOpen: !this.state.dropdownOpen
    });
  }

  fetchQuery() {
    const { currentFilterValue, selectedAccommodationType, selectedCounty, selectedQuestion } = this.state;

    if (selectedQuestion) {
      const { fields } = selectedQuestion;
      if (!((fields.includes(OPTIONS.COUNTY) && selectedCounty)
          && (fields.includes(OPTIONS.TYPE) && selectedAccommodationType)
         && (fields.includes(OPTIONS.NUMBER_FILTER) && currentFilterValue))) {
        switch (selectedQuestion) {
          case QUESTIONS.Q1: {
            this.props.fetchHouseholdsAndPersonsByAccommodationType(selectedAccommodationType);
            break;
          }
          case QUESTIONS.Q2: {
            this.props.fetchHouseholdsAndPersonsByCountyAndType(selectedAccommodationType, selectedCounty);
            break;
          }
          case QUESTIONS.Q3: {
            this.props.fetchHouseholdsByCountyByAccType(selectedAccommodationType, selectedCounty);
            break;
          }
          case QUESTIONS.Q4: {
            this.props.fetchPersonsByCountyByAccType(selectedAccommodationType, selectedCounty);
            break;
          }
          case QUESTIONS.Q5: {
            this.props.fetchPersonsByCountyByAccType(null, selectedCounty);
            break;
          }
          case QUESTIONS.Q6: {
            this.props.fetchHouseholdsByCountyByAccType(null, selectedCounty);
            break;
          }
          case QUESTIONS.Q7: {
            this.props.fetchPersonsByCountyByAccType(selectedAccommodationType);
            break;
          }
          case QUESTIONS.Q8: {
            this.props.fetchHouseholdsByCountyByAccType(selectedAccommodationType);
            break;
          }
          case QUESTIONS.Q9: {
            this.props.fetchHouseholdsByCountyByAccType(selectedAccommodationType, null, currentFilterValue);
            break;
          }
          case QUESTIONS.Q10: {
            this.props.fetchPersonsByCountyByAccType(selectedAccommodationType, null, currentFilterValue);
            break;
          }
          default: {
            console.log('No action specified yet')
          }
        }
      }
    }

  }

  selectQuestion(selectedQuestion) {
    this.setState({
      selectedQuestion
    }, () => this.props.changedQuestion());
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
    return QUESTION_KEYS.map((key, i) => {
      const question = questions[key];
      let text = question.text;
      text = question.fields.includes(OPTIONS.TYPE) ? `${text} living in [Accommodation Type]` : `${text} by Accommodation Type`;
      text = question.fields.includes(OPTIONS.COUNTY) ? `${text} in [County]` : `${text} by County`;
      text = question.fields.includes(OPTIONS.NUMBER_FILTER) ? `${text} above [X]` : text;
      return <DropdownItem key={i} onClick={() => this.selectQuestion(question)}>{key}: {text}</DropdownItem>
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
      <Col sm="12" md="auto" className="query-option">
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
      <Col sm="12" md="auto" className="query-option">
        <Row>
          <Col xs="4" className="options-for">
            <p>living in</p>
          </Col>
          <Col xs="8">
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
      <Col sm="12" md="auto" className="query-option">
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
    let dropdownText = selectedQuestion ? selectedQuestion.text : 'Choose a Query';
    if (selectedQuestion) {
      dropdownText = !selectedQuestion.fields.includes(OPTIONS.TYPE) ? `${dropdownText} by Accommodation Type` : dropdownText;
      dropdownText = !selectedQuestion.fields.includes(OPTIONS.COUNTY) ? `${dropdownText} by County` : dropdownText;
    }

    return (
      <div>
        <Container className="query-page">
          <Row>
            <Col sm="12" md="auto" className="query-option">
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
        <Results
          selectedCounty={selectedCounty}
          selectedAccommodationType={selectedAccommodationType}
          selectedQuestion={selectedQuestion}
        />
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
    changedQuestion,
    fetchHouseholdsAndPersonsByAccommodationType,
    fetchHouseholdsAndPersonsByCountyAndType,
    fetchHouseholdsByCountyByAccType,
    fetchPersonsByCountyByAccType
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(QueryPage);

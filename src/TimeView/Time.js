import React from 'react';
import { Row, Col, Button } from 'reactstrap';
import { Item } from '../Styles';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronUp, faChevronDown } from '@fortawesome/free-solid-svg-icons';
import { addHours, addMinutes } from 'date-fns';
import { padStart } from 'lodash';

export default class Time extends React.Component {
  constructor(props) {
    super(props);
    this.changeHours = this.changeHours.bind(this);
    this.nextHour = this.nextHour.bind(this);
    this.prevHour = this.prevHour.bind(this);
    this.changeMinutes = this.changeMinutes.bind(this);
    this.nextMinute = this.nextMinute.bind(this);
    this.prevMinute = this.prevMinute.bind(this);
    this.setView = this.setView.bind(this);
  }

  changeHours(inc) {
    const date = this.props.actions.get();
    this.props.actions.select(addHours(date, inc));
  }

  nextHour() {
    this.changeHours(1);
  }

  prevHour() {
    this.changeHours(-1);
  }

  changeMinutes(inc) {
    const date = this.props.actions.get();
    this.props.actions.select(addMinutes(date, inc));
  }

  nextMinute() {
    this.changeMinutes(1);
  }

  prevMinute() {
    this.changeMinutes(-1);
  }

  setView(e) {
    e.preventDefault();
    this.props.actions.view(e.target.dataset.view);
  }

  render() {
    return (
      <Row className="no-gutters">
        <Col xs={{ size: 10, offset: 1 }}>
          <Row className="no-gutters">
            <Col className="d-flex">
              <Button
                className="flex-fill"
                color="light"
                onClick={this.nextHour}>
                <FontAwesomeIcon icon={faChevronUp} />
              </Button>
            </Col>
            <Col className="d-flex">&nbsp;</Col>
            <Col className="d-flex">
              <Button
                className="flex-fill"
                color="light"
                onClick={this.nextMinute}>
                <FontAwesomeIcon icon={faChevronUp} />
              </Button>
            </Col>
          </Row>
          <Row className="no-gutters py-2">
            <Col className="d-flex">
              <Item
                href="#"
                className="lead font-weight-bold"
                data-view="hours"
                onClick={this.setView}>
                {padStart(this.props.hours, 2, 0)}
              </Item>
            </Col>
            <Col className="d-flex align-self-center justify-content-center">
              :
            </Col>
            <Col className="d-flex">
              <Item
                href="#"
                className="lead font-weight-bold"
                data-view="minutes"
                onClick={this.setView}>
                {padStart(this.props.minutes, 2, 0)}
              </Item>
            </Col>
          </Row>
          <Row className="no-gutters">
            <Col className="d-flex">
              <Button
                className="flex-fill"
                color="light"
                onClick={this.prevHour}>
                <FontAwesomeIcon icon={faChevronDown} />
              </Button>
            </Col>
            <Col className="d-flex">&nbsp;</Col>
            <Col className="d-flex">
              <Button
                className="flex-fill"
                color="light"
                onClick={this.prevMinute}>
                <FontAwesomeIcon icon={faChevronDown} />
              </Button>
            </Col>
          </Row>
        </Col>
      </Row>
    );
  }
}

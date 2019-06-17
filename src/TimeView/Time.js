import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronUp } from '@fortawesome/free-solid-svg-icons/faChevronUp';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons/faChevronDown';
import addHours from 'date-fns/addHours';
import addMinutes from 'date-fns/addMinutes';
import padStart from 'lodash/padStart';
import { Item } from '../Styles';

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

  setView(e) {
    e.preventDefault();
    const { actions } = this.props;
    actions.view(e.target.dataset.view);
  }

  changeHours(inc) {
    const { actions } = this.props;
    const date = actions.get();
    actions.select(addHours(date, inc));
  }

  nextHour() {
    this.changeHours(1);
  }

  prevHour() {
    this.changeHours(-1);
  }

  changeMinutes(inc) {
    const { actions } = this.props;
    const date = actions.get();
    actions.select(addMinutes(date, inc));
  }

  nextMinute() {
    this.changeMinutes(1);
  }

  prevMinute() {
    this.changeMinutes(-1);
  }

  render() {
    const { hours, minutes } = this.props;
    return (
      <div className="row no-gutters">
        <div className="col col-10 offset-1">
          <div className="row no-gutters">
            <div className="col d-flex">
              <button type="button" className="btn btn-light flex-fill" onClick={this.nextHour}>
                <FontAwesomeIcon icon={faChevronUp} />
              </button>
            </div>
            <div className="col d-flex">&nbsp;</div>
            <div className="col d-flex">
              <button type="button" className="btn btn-light flex-fill" onClick={this.nextMinute}>
                <FontAwesomeIcon icon={faChevronUp} />
              </button>
            </div>
          </div>
          <div className="row no-gutters py-2">
            <div className="col d-flex">
              <Item
                href="#"
                className="lead font-weight-bold"
                data-view="hours"
                onClick={this.setView}
              >
                {padStart(hours, 2, 0)}
              </Item>
            </div>
            <div className="col d-flex align-self-center justify-content-center">:</div>
            <div className="col d-flex">
              <Item
                href="#"
                className="lead font-weight-bold"
                data-view="minutes"
                onClick={this.setView}
              >
                {padStart(minutes, 2, 0)}
              </Item>
            </div>
          </div>
          <div className="row no-gutters">
            <div className="col d-flex">
              <button type="button" className="btn btn-light flex-fill" onClick={this.prevHour}>
                <FontAwesomeIcon icon={faChevronDown} />
              </button>
            </div>
            <div className="col d-flex">&nbsp;</div>
            <div className="col d-flex">
              <button type="button" className="btn btn-light flex-fill" onClick={this.prevMinute}>
                <FontAwesomeIcon icon={faChevronDown} />
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

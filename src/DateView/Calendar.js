import React from 'react';
import Control from './Control';
import { Item } from '../Styles';
import { Row, Col } from 'reactstrap';
import getDay from 'date-fns/getDay';
import addDays from 'date-fns/addDays';
import addMonths from 'date-fns/addMonths';
import getDate from 'date-fns/getDate';
import getMonth from 'date-fns/getMonth';
import getYear from 'date-fns/getYear';
import format from 'date-fns/format';
import isEqual from 'date-fns/isEqual';
import startOfDay from 'date-fns/startOfDay';
import { enUS as locale } from 'date-fns/locale';
import { chunk, times, upperFirst } from 'lodash';

export default class Calendar extends React.Component {
  constructor(props) {
    super(props);

    this.locale = this.props.locale || locale;

    const dayOfWeek = day =>
      this.locale.options.weekStartsOn ? (day + 1 > 6 ? 0 : day + 1) : day;

    this.calendarArray = date => {
      const offset = getDay(date) - this.locale.options.weekStartsOn || 7;
      return chunk(times(42, i => addDays(date, i - offset)), 7);
    };

    this.header = (
      <Row className="no-gutters pb-2 text-center">
        {times(7, i => (
          <Col className="font-weight-bold" key={i}>
            {upperFirst(
              this.locale.localize.day(dayOfWeek(i), { width: 'short' })
            )}
          </Col>
        ))}
      </Row>
    );

    this.changeMonth = this.changeMonth.bind(this);
    this.nextMonth = this.nextMonth.bind(this);
    this.prevMonth = this.prevMonth.bind(this);
    this.setView = this.setView.bind(this);
    this.onClick = this.onClick.bind(this);
  }

  changeMonth(inc) {
    const date = this.props.actions.get();
    const next = addMonths(date, inc);
    this.props.actions.set({
      month: getMonth(next),
      year: getYear(next),
    });
  }

  nextMonth() {
    this.changeMonth(1);
  }

  prevMonth() {
    this.changeMonth(-1);
  }

  setView() {
    this.props.actions.view('months');
  }

  onClick(e) {
    e.preventDefault();
    this.props.actions.set(
      {
        day: Number(e.target.dataset.day),
        month: Number(e.target.dataset.month),
        year: Number(e.target.dataset.year),
      },
      () => this.props.actions.select(this.props.actions.get())
    );
  }

  render() {
    const date = new Date(this.props.year, this.props.month);
    const calendar = this.calendarArray(date);
    return (
      <div>
        <Control
          next={this.nextMonth}
          prev={this.prevMonth}
          view={this.setView}>
          {upperFirst(format(date, 'LLLL, yyyy', { locale: this.locale }))}
        </Control>
        {this.header}
        {calendar.map((el, idx) => (
          <Row className="no-gutters" key={idx}>
            {el.map((el, idx) => {
              const className = [];
              if (this.props.month !== getMonth(el)) className.push('muted');
              if (isEqual(el, startOfDay(this.props.date)))
                className.push('active');
              if (isEqual(el, startOfDay(new Date()))) className.push('today');
              return (
                <Col className="d-flex" key={idx}>
                  <Item
                    href="#"
                    className={className.join(' ')}
                    data-day={getDate(el)}
                    data-month={getMonth(el)}
                    data-year={getYear(el)}
                    onClick={this.onClick}>
                    {getDate(el)}
                  </Item>
                </Col>
              );
            })}
          </Row>
        ))}
      </div>
    );
  }
}

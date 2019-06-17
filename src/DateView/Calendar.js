import React from 'react';
import getDay from 'date-fns/getDay';
import addDays from 'date-fns/addDays';
import addMonths from 'date-fns/addMonths';
import getDate from 'date-fns/getDate';
import getMonth from 'date-fns/getMonth';
import getYear from 'date-fns/getYear';
import format from 'date-fns/format';
import isEqual from 'date-fns/isEqual';
import startOfDay from 'date-fns/startOfDay';
import usLocale from 'date-fns/locale/en-US';
import upperFirst from 'lodash/upperFirst';
import { Item } from '../Styles';
import Control from './Control';

export default class Calendar extends React.Component {
  constructor(props) {
    super(props);

    const { locale } = this.props;
    this.locale = locale || usLocale;

    const dayOfWeek = day => {
      const { weekStartsOn } = this.locale.options;
      if (!weekStartsOn) return day;
      return day + 1 > 6 ? 0 : day + 1;
    };

    this.calendarArray = date => {
      const offset = getDay(date) - this.locale.options.weekStartsOn || 7;
      return Array.from({ length: 6 }, (row, rowIdx) => ({
        id: rowIdx,
        el: Array.from({ length: 7 }, (col, colIdx) => ({
          id: colIdx,
          el: addDays(date, rowIdx * 7 + colIdx - offset)
        }))
      }));
    };

    this.header = (
      <div className="row no-gutters pb-2 text-center">
        {Array.from({ length: 7 }, (el, idx) => (
          <div className="col font-weight-bold" key={idx}>
            {upperFirst(this.locale.localize.day(dayOfWeek(idx), { width: 'short' }))}
          </div>
        ))}
      </div>
    );

    this.changeMonth = this.changeMonth.bind(this);
    this.nextMonth = this.nextMonth.bind(this);
    this.prevMonth = this.prevMonth.bind(this);
    this.setView = this.setView.bind(this);
    this.onClick = this.onClick.bind(this);
  }

  onClick(e) {
    e.preventDefault();
    const { actions } = this.props;
    const { day, month, year } = e.target.dataset;
    actions.set(
      {
        day: Number(day),
        month: Number(month),
        year: Number(year)
      },
      () => {
        actions.select(actions.get());
        actions.hide();
      }
    );
  }

  setView() {
    const { actions } = this.props;
    actions.view('months');
  }

  changeMonth(inc) {
    const { actions } = this.props;
    const date = actions.get();
    const next = addMonths(date, inc);
    actions.set({
      month: getMonth(next),
      year: getYear(next)
    });
  }

  nextMonth() {
    this.changeMonth(1);
  }

  prevMonth() {
    this.changeMonth(-1);
  }

  render() {
    const { year, month, date } = this.props;
    const calendarDate = new Date(year, month);
    const calendar = this.calendarArray(calendarDate);
    return (
      <div>
        <Control next={this.nextMonth} prev={this.prevMonth} view={this.setView}>
          {upperFirst(format(calendarDate, 'LLLL, yyyy', { locale: this.locale }))}
        </Control>
        {this.header}
        {calendar.map(row => (
          <div className="row no-gutters" key={row.id}>
            {row.el.map(day => {
              const className = [];
              if (month !== getMonth(day.el)) className.push('muted');
              if (isEqual(day.el, startOfDay(date))) className.push('active');
              if (isEqual(day.el, startOfDay(Date.now()))) className.push('today');
              return (
                <div className="col d-flex" key={day.id}>
                  <Item
                    href="#"
                    className={className.join(' ')}
                    data-day={getDate(day.el)}
                    data-month={getMonth(day.el)}
                    data-year={getYear(day.el)}
                    onClick={this.onClick}
                  >
                    {getDate(day.el)}
                  </Item>
                </div>
              );
            })}
          </div>
        ))}
      </div>
    );
  }
}

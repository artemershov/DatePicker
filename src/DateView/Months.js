import React from 'react';
import getMonth from 'date-fns/getMonth';
import getYear from 'date-fns/getYear';
import addYears from 'date-fns/addYears';
import usLocale from 'date-fns/locale/en-US';
import upperFirst from 'lodash/upperFirst';
import { Item } from '../Styles';
import Control from './Control';

export default class Months extends React.Component {
  constructor(props) {
    super(props);

    const { locale } = this.props;
    this.locale = locale || usLocale;

    this.monthsArray = Array.from({ length: 3 }, (row, rowIdx) => ({
      id: rowIdx,
      el: Array.from({ length: 4 }, (col, colIdx) => ({
        id: rowIdx * 4 + colIdx,
        el: upperFirst(this.locale.localize.month(rowIdx * 4 + colIdx, { width: 'abbreviated' }))
      }))
    }));

    this.changeYear = this.changeYear.bind(this);
    this.nextYear = this.nextYear.bind(this);
    this.prevYear = this.prevYear.bind(this);
    this.setView = this.setView.bind(this);
    this.onClick = this.onClick.bind(this);
  }

  onClick(e) {
    e.preventDefault();
    const { actions } = this.props;
    actions.set({ month: Number(e.target.dataset.month) }, () => actions.view('calendar'));
  }

  setView() {
    const { actions } = this.props;
    actions.view('years');
  }

  changeYear(inc) {
    const { actions } = this.props;
    const date = actions.get();
    const next = addYears(date, inc);
    actions.set({ year: getYear(next) });
  }

  nextYear() {
    this.changeYear(1);
  }

  prevYear() {
    this.changeYear(-1);
  }

  render() {
    const { year, date } = this.props;
    return (
      <div>
        <Control next={this.nextYear} prev={this.prevYear} view={this.setView}>
          {year}
        </Control>
        {this.monthsArray.map(row => (
          <div className="row no-gutters" key={row.id}>
            {row.el.map(month => (
              <div className="col d-flex" key={month.id}>
                <Item
                  href="#"
                  className={getMonth(date) === month.id ? 'active' : ''}
                  data-month={month.id}
                  onClick={this.onClick}
                >
                  {month.el}
                </Item>
              </div>
            ))}
          </div>
        ))}
      </div>
    );
  }
}

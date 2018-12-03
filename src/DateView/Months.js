import React from 'react';
import Control from './Control';
import { Item } from '../Styles';
import { Row, Col } from 'reactstrap';
import { getMonth, getYear, addYears } from 'date-fns';
import { enUS as locale } from 'date-fns/locale';
import { chunk, times, upperFirst } from 'lodash';

export default class Months extends React.Component {
  constructor(props) {
    super(props);

    this.locale = this.props.locale || locale;
    this.monthsArray = chunk(
      times(12, i => ({
        index: i,
        title: upperFirst(
          this.locale.localize.month(i, { width: 'abbreviated' })
        ),
      })),
      4
    );

    this.changeYear = this.changeYear.bind(this);
    this.nextYear = this.nextYear.bind(this);
    this.prevYear = this.prevYear.bind(this);
    this.setView = this.setView.bind(this);
    this.onClick = this.onClick.bind(this);
  }

  changeYear(inc) {
    const date = this.props.actions.get();
    const next = addYears(date, inc);
    this.props.actions.set({ year: getYear(next) });
  }

  nextYear() {
    this.controlAction.changeYear(1);
  }

  prevYear() {
    this.controlAction.changeYear(-1);
  }

  setView() {
    this.props.actions.view('years');
  }

  onClick(e) {
    e.preventDefault();
    this.props.actions.set(
      {
        month: Number(e.target.dataset.month),
      },
      () => this.props.actions.view('calendar')
    );
  }

  render() {
    return (
      <div>
        <Control next={this.nextYear} prev={this.prevYear} view={this.setView}>
          {this.props.year}
        </Control>
        {this.monthsArray.map((el, idx) => (
          <Row className="no-gutters" key={idx}>
            {el.map((el, idx) => (
              <Col className="d-flex" key={idx}>
                <Item
                  href="#"
                  className={
                    getMonth(this.props.date) == el.index ? 'active' : ''
                  }
                  data-month={el.index}
                  onClick={this.onClick}>
                  {el.title}
                </Item>
              </Col>
            ))}
          </Row>
        ))}
      </div>
    );
  }
}

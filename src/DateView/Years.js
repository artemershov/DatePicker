import React from 'react';
import getYear from 'date-fns/getYear';
import { Item } from '../Styles';
import Control from './Control';

const yearsArray = year =>
  Array.from({ length: 3 }, (row, rowIdx) => ({
    id: rowIdx,
    el: Array.from({ length: 4 }, (col, colIdx) => ({
      id: colIdx,
      el: year - 5 + rowIdx * 4 + colIdx
    }))
  }));

export default class Years extends React.Component {
  constructor(props) {
    super(props);
    this.state = { offset: 0 };
    this.changeDecade = this.changeDecade.bind(this);
    this.nextDecade = this.nextDecade.bind(this);
    this.prevDecade = this.prevDecade.bind(this);
    this.onClick = this.onClick.bind(this);
  }

  onClick(e) {
    e.preventDefault();
    const { actions } = this.props;
    actions.set({ year: Number(e.target.dataset.year) }, () => actions.view('months'));
  }

  changeDecade(inc) {
    this.setState(state => {
      const offset = state.offset + inc;
      return { ...state, offset };
    });
  }

  nextDecade() {
    this.changeDecade(12);
  }

  prevDecade() {
    this.changeDecade(-12);
  }

  render() {
    const { offset } = this.state;
    const { date, current } = this.props;
    const years = yearsArray(current + offset);
    const start = current + offset - 5;
    const end = current + offset + 6;
    return (
      <div>
        <Control next={this.nextDecade} prev={this.prevDecade}>
          {`${start} - ${end}`}
        </Control>
        {years.map(row => (
          <div className="row no-gutters" key={row.id}>
            {row.el.map(year => (
              <div className="col d-flex" key={year.id}>
                <Item
                  className={getYear(date) === year.el ? 'active' : ''}
                  href="#"
                  data-year={year.el}
                  onClick={this.onClick}
                >
                  {year.el}
                </Item>
              </div>
            ))}
          </div>
        ))}
      </div>
    );
  }
}

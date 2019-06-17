import React from 'react';
import getHours from 'date-fns/getHours';
import setHours from 'date-fns/setHours';
import padStart from 'lodash/padStart';
import { Item } from '../Styles';

const hours = Array.from({ length: 4 }, (row, rowIdx) => ({
  id: rowIdx,
  el: Array.from({ length: 6 }, (col, colIdx) => ({
    id: colIdx,
    el: padStart(rowIdx * 6 + colIdx, 2, 0)
  }))
}));

export default class Hours extends React.Component {
  constructor(props) {
    super(props);
    this.onClick = this.onClick.bind(this);
  }

  onClick(e) {
    e.preventDefault();
    const { actions } = this.props;
    const date = setHours(actions.get(), Number(e.target.dataset.hours));
    actions.select(date);
    actions.view('time');
  }

  render() {
    const { date } = this.props;
    return (
      <div>
        {hours.map(row => (
          <div className="row no-gutters" key={row.id}>
            {row.el.map(hour => (
              <div className="col d-flex" key={hour.id}>
                <Item
                  href="#"
                  className={getHours(date) === hour.el ? 'active' : ''}
                  data-hours={hour.el}
                  onClick={this.onClick}
                >
                  {hour.el}
                </Item>
              </div>
            ))}
          </div>
        ))}
      </div>
    );
  }
}

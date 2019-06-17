import React from 'react';
import getMinutes from 'date-fns/getMinutes';
import setMinutes from 'date-fns/setMinutes';
import padStart from 'lodash/padStart';
import { Item } from '../Styles';

const minutes = Array.from({ length: 3 }, (row, rowIdx) => ({
  id: rowIdx,
  el: Array.from({ length: 4 }, (col, colIdx) => ({
    id: colIdx,
    el: padStart((rowIdx * 4 + colIdx) * 5, 2, 0)
  }))
}));

export default class Minutes extends React.Component {
  constructor(props) {
    super(props);
    this.onClick = this.onClick.bind(this);
  }

  onClick(e) {
    e.preventDefault();
    const { actions } = this.props;
    const date = setMinutes(actions.get(), Number(e.target.dataset.minutes));
    actions.select(date);
    actions.view('time');
  }

  render() {
    const { date } = this.props;
    return (
      <div>
        {minutes.map(row => (
          <div className="row no-gutters" key={row.id}>
            {row.el.map(minute => (
              <div className="col d-flex" key={minute.id}>
                <Item
                  href="#"
                  className={getMinutes(date) === minute.el ? 'active' : ''}
                  data-minutes={minute.el}
                  onClick={this.onClick}
                >
                  {minute.el}
                </Item>
              </div>
            ))}
          </div>
        ))}
      </div>
    );
  }
}

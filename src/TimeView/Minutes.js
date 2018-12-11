import React from 'react';
import { Item } from '../Styles';
import getMinutes from 'date-fns/getMinutes';
import setMinutes from 'date-fns/setMinutes';
import range from 'lodash/range';
import chunk from 'lodash/chunk';
import padStart from 'lodash/padStart';

const minutes = chunk(range(0, 60, 5).map(i => padStart(i, 2, 0)), 4);

export default class Minutes extends React.Component {
  constructor(props) {
    super(props);
    this.onClick = this.onClick.bind(this);
  }

  onClick(e) {
    e.preventDefault();
    const minutes = Number(e.target.dataset.minutes);
    const date = setMinutes(this.props.actions.get(), minutes);
    this.props.actions.select(date);
    this.props.actions.view('time');
  }

  render() {
    return (
      <div>
        {minutes.map((el, idx) => (
          <div className="row no-gutters" key={idx}>
            {el.map((el, idx) => (
              <div className="col d-flex" key={idx}>
                <Item
                  href="#"
                  className={getMinutes(this.props.date) == el ? 'active' : ''}
                  data-minutes={el}
                  onClick={this.onClick}>
                  {el}
                </Item>
              </div>
            ))}
          </div>
        ))}
      </div>
    );
  }
}

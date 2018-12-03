import React from 'react';
import { Row, Col } from 'reactstrap';
import { Item } from '../Styles';
import getHours from 'date-fns/getHours';
import setHours from 'date-fns/setHours';
import { times, chunk, padStart } from 'lodash';

const hours = chunk(times(24, i => padStart(i, 2, 0)), 6);

export default class Hours extends React.Component {
  constructor(props) {
    super(props);
    this.onClick = this.onClick.bind(this);
  }

  onClick(e) {
    e.preventDefault();
    const hour = Number(e.target.dataset.hours);
    const date = setHours(this.props.actions.get(), hour);
    this.props.actions.select(date);
    this.props.actions.view('time');
  }

  render() {
    return (
      <div>
        {hours.map((el, idx) => (
          <Row className="no-gutters" key={idx}>
            {el.map((el, idx) => (
              <Col className="d-flex" key={idx}>
                <Item
                  href="#"
                  className={getHours(this.props.date) == el ? 'active' : ''}
                  data-hours={el}
                  onClick={this.onClick}>
                  {el}
                </Item>
              </Col>
            ))}
          </Row>
        ))}
      </div>
    );
  }
}

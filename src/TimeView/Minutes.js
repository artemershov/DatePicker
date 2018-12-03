import React from 'react';
import { Row, Col } from 'reactstrap';
import { Item } from '../Styles';
import getMinutes from 'date-fns/getMinutes';
import setMinutes from 'date-fns/setMinutes';
import { range, chunk, padStart } from 'lodash';

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
          <Row className="no-gutters" key={idx}>
            {el.map((el, idx) => (
              <Col className="d-flex" key={idx}>
                <Item
                  href="#"
                  className={getMinutes(this.props.date) == el ? 'active' : ''}
                  data-minutes={el}
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

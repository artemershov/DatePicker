import React from 'react';
import Control from './Control';
import { Row, Col } from 'reactstrap';
import { Item } from '../Styles';
import { getYear } from 'date-fns';
import { chunk, range } from 'lodash';

const yearsArray = year => chunk(range(-5, 7).map(i => year + i), 4);

export default class Years extends React.Component {
  constructor(props) {
    super(props);
    this.state = { offset: 0 };
    this.changeDecade = this.changeDecade.bind(this);
    this.nextDecade = this.nextDecade.bind(this);
    this.prevDecade = this.prevDecade.bind(this);
    this.onClick = this.onClick.bind(this);
  }

  changeDecade(inc) {
    this.setState(prev => {
      prev.offset += inc;
      return prev;
    });
  }

  nextDecade() {
    this.controlAction.changeYear(12);
  }

  prevDecade() {
    this.controlAction.changeYear(-12);
  }

  onClick(e) {
    e.preventDefault();
    this.props.actions.set(
      {
        year: Number(e.target.dataset.year),
      },
      () => this.props.actions.view('months')
    );
  }

  render() {
    const years = yearsArray(this.props.current + this.state.offset);
    const start = this.props.current + this.state.offset - 5;
    const end = this.props.current + this.state.offset + 6;
    return (
      <div>
        <Control next={this.nextDecade} prev={this.prevDecade}>
          {start} - {end}
        </Control>
        {years.map((el, idx) => (
          <Row className="no-gutters" key={idx}>
            {el.map((el, idx) => (
              <Col className="d-flex" key={idx}>
                <Item
                  className={getYear(this.props.date) == el ? 'active' : ''}
                  href="#"
                  data-year={el}
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

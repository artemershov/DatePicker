import React from 'react';
import { Row, Col, Button } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons/faTimes';
import { faCrosshairs } from '@fortawesome/free-solid-svg-icons/faCrosshairs';
import { faCalendar } from '@fortawesome/free-regular-svg-icons/faCalendar';
import { faClock } from '@fortawesome/free-regular-svg-icons/faClock';

export default class Control extends React.Component {
  render() {
    return (
      <Row className="no-gutters">
        <Col className="d-flex">
          <Button
            className="flex-fill"
            outline
            color="secondary"
            onClick={this.props.actions.today}>
            <FontAwesomeIcon icon={faCrosshairs} />
          </Button>
        </Col>
        <Col className="d-flex px-2">
          <Button
            className="flex-fill"
            outline
            color="secondary"
            onClick={this.props.actions.toggle}>
            <FontAwesomeIcon
              icon={this.props.view == 'date' ? faClock : faCalendar}
            />
          </Button>
        </Col>
        <Col className="d-flex">
          <Button
            className="flex-fill"
            outline
            color="secondary"
            onClick={this.props.actions.clear}>
            <FontAwesomeIcon icon={faTimes} />
          </Button>
        </Col>
      </Row>
    );
  }
}

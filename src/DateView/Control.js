import React from 'react';
import { Button } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleLeft } from '@fortawesome/free-solid-svg-icons/faAngleLeft';
import { faAngleRight } from '@fortawesome/free-solid-svg-icons/faAngleRight';

export default class Control extends React.Component {
  render() {
    return (
      <div className="pb-2">
        <div className="d-flex">
          <div>
            <Button
              size="sm"
              outline
              color="secondary"
              onClick={this.props.prev}>
              <FontAwesomeIcon icon={faAngleLeft} />
            </Button>
          </div>
          <div className="d-flex flex-fill px-2">
            <Button
              size="sm"
              className="flex-fill"
              outline
              color="secondary"
              onClick={this.props.view}>
              {this.props.children}
            </Button>
          </div>
          <div>
            <Button
              size="sm"
              outline
              color="secondary"
              onClick={this.props.next}>
              <FontAwesomeIcon icon={faAngleRight} />
            </Button>
          </div>
        </div>
      </div>
    );
  }
}

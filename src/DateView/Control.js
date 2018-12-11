import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleLeft } from '@fortawesome/free-solid-svg-icons/faAngleLeft';
import { faAngleRight } from '@fortawesome/free-solid-svg-icons/faAngleRight';

export default class Control extends React.Component {
  render() {
    return (
      <div className="pb-3">
        <div className="d-flex">
          <div>
            <button
              className="btn btn-sm btn-outline-secondary"
              onClick={this.props.prev}>
              <FontAwesomeIcon icon={faAngleLeft} />
            </button>
          </div>
          <div className="d-flex flex-fill px-2">
            <button
              className="btn btn-sm btn-outline-secondary flex-fill"
              onClick={this.props.view}>
              {this.props.children}
            </button>
          </div>
          <div>
            <button
              className="btn btn-sm btn-outline-secondary"
              onClick={this.props.next}>
              <FontAwesomeIcon icon={faAngleRight} />
            </button>
          </div>
        </div>
      </div>
    );
  }
}

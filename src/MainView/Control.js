import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons/faTimes';
import { faCrosshairs } from '@fortawesome/free-solid-svg-icons/faCrosshairs';
import { faCalendar } from '@fortawesome/free-regular-svg-icons/faCalendar';
import { faClock } from '@fortawesome/free-regular-svg-icons/faClock';

export default class Control extends React.Component {
  render() {
    return (
      <div className="row no-gutters pt-3">
        <div className="col d-flex">
          <button
            className="btn btn-sm btn-outline-secondary flex-fill"
            onClick={this.props.actions.today}>
            <FontAwesomeIcon icon={faCrosshairs} />
          </button>
        </div>
        <div className="col d-flex px-2">
          <button
            className="btn btn-sm btn-outline-secondary flex-fill"
            onClick={this.props.actions.toggle}>
            <FontAwesomeIcon
              icon={this.props.view == 'date' ? faClock : faCalendar}
            />
          </button>
        </div>
        <div className="col d-flex">
          <button
            className="btn btn-sm btn-outline-secondary flex-fill"
            onClick={this.props.actions.clear}>
            <FontAwesomeIcon icon={faTimes} />
          </button>
        </div>
      </div>
    );
  }
}

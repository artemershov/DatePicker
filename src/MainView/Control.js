import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons/faTimes';
import { faCrosshairs } from '@fortawesome/free-solid-svg-icons/faCrosshairs';
import { faCalendar } from '@fortawesome/free-regular-svg-icons/faCalendar';
import { faClock } from '@fortawesome/free-regular-svg-icons/faClock';

const Control = ({ actions, view }) => (
  <div className="row no-gutters pt-3">
    <div className="col d-flex">
      <button
        type="button"
        className="btn btn-sm btn-outline-secondary flex-fill"
        onClick={actions.today}
      >
        <FontAwesomeIcon icon={faCrosshairs} />
      </button>
    </div>
    <div className="col d-flex px-2">
      <button
        type="button"
        className="btn btn-sm btn-outline-secondary flex-fill"
        onClick={actions.toggle}
      >
        <FontAwesomeIcon icon={view === 'date' ? faClock : faCalendar} />
      </button>
    </div>
    <div className="col d-flex">
      <button
        type="button"
        className="btn btn-sm btn-outline-secondary flex-fill"
        onClick={actions.clear}
      >
        <FontAwesomeIcon icon={faTimes} />
      </button>
    </div>
  </div>
);

export default Control;

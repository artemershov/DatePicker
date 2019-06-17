import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleLeft } from '@fortawesome/free-solid-svg-icons/faAngleLeft';
import { faAngleRight } from '@fortawesome/free-solid-svg-icons/faAngleRight';

const Control = ({ prev, next, view, children }) => (
  <div className="pb-3">
    <div className="d-flex">
      <div>
        <button type="button" className="btn btn-sm btn-outline-secondary" onClick={prev}>
          <FontAwesomeIcon icon={faAngleLeft} />
        </button>
      </div>
      <div className="d-flex flex-fill px-2">
        <button type="button" className="btn btn-sm btn-outline-secondary flex-fill" onClick={view}>
          {children}
        </button>
      </div>
      <div>
        <button type="button" className="btn btn-sm btn-outline-secondary" onClick={next}>
          <FontAwesomeIcon icon={faAngleRight} />
        </button>
      </div>
    </div>
  </div>
);

export default Control;

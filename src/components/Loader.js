import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';

const Loader = () => {
  return (
    <div id="loader">
      <FontAwesomeIcon icon={faSpinner} className="fa-spin" />
    </div>
  );
};

export default Loader;
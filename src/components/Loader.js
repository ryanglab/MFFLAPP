import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleNotch, faSpinner } from '@fortawesome/free-solid-svg-icons';

const Loader = () => {
  return (
    <div id="loader">
      <img src="/img/logo.svg" />
      <div>
        <FontAwesomeIcon icon={faCircleNotch} className="fa-spin" />
        <h2>Loading</h2>
      </div>
    </div>
  );
};

export default Loader;
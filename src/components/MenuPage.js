import React from 'react';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExternalLinkAlt, faFootballBall } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';

class MenuPage extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div id="menu">
        <div className="item">
          <a href="https://www.mchenryffl.com/" target="_blank" rel="noopener noreferrer">
            <img src="/img/menu-mffl.svg" />
            Full Site
          </a>
        </div>
        <div className="item">
          <a href="https://www.fleaflicker.com/nfl/leagues/175541" target="_blank" rel="noopener noreferrer">
            <img src="/img/menu-fleaflicker.svg" />
            Flea Flicker
          </a>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return state;
};

export default connect(mapStateToProps)(MenuPage);
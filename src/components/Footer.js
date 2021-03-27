import React from 'react';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMoneyBillWave, faGraduationCap, faUser, faGavel, faFlag, faTh } from '@fortawesome/free-solid-svg-icons';
import { NavLink } from 'react-router-dom';

class Footer extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <footer id="footer" className={this.props.match.params.slug && this.props.match.params.slug}>
        <NavLink to="/overview" activeClassName="is-active"><FontAwesomeIcon icon={faMoneyBillWave} /></NavLink>
        <NavLink to="/draft" activeClassName="is-active"><FontAwesomeIcon icon={faGraduationCap} /></NavLink>
        <NavLink to="/auction" activeClassName="is-active"><FontAwesomeIcon icon={faGavel} /></NavLink>
        <NavLink to="/players" activeClassName="is-active"><FontAwesomeIcon icon={faUser} /></NavLink>
        <NavLink to="/teams" activeClassName="is-active" onClick={(e) => { this.props.toggleTeamsModal(); e.preventDefault(); }}><FontAwesomeIcon icon={faFlag} /></NavLink>
        <NavLink to="/menu" activeClassName="is-active"><FontAwesomeIcon icon={faTh} /></NavLink>
      </footer >
    );
  }
}

const mapStateToProps = (state) => {
  return state;
};

export default connect(mapStateToProps)(Footer);
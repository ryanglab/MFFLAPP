import React from 'react';
import { connect } from 'react-redux';
import { Switch, Route, NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFlag, faSyncAlt } from '@fortawesome/free-solid-svg-icons';
import { getFranchiseTitle } from '../selectors/selectors';

class HeaderDraft extends React.Component {
  render() {
    return (
      <React.Fragment>
        <NavLink to="/draft" activeClassName="is-active" exact>Board</NavLink>
        <NavLink to="/draft/rookies" activeClassName="is-active" exact>Rookies</NavLink>
      </React.Fragment>
    );
  }
}

class HeaderFranchise extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <React.Fragment>
        <NavLink to={`/teams/${this.props.match.params.slug}`} activeClassName="is-active" exact>Overview</NavLink>
        <NavLink to={`/teams/${this.props.match.params.slug}/roster`} activeClassName="is-active" exact>Roster</NavLink>
        <NavLink to={`/teams/${this.props.match.params.slug}/cash`} activeClassName="is-active" exact>Cash</NavLink>
        <NavLink to={`/teams/${this.props.match.params.slug}/picks`} activeClassName="is-active" exact>Picks</NavLink>
      </React.Fragment>
    );
  }
}

class HeaderOverview extends React.Component {
  render() {
    return (
      <React.Fragment>
        <NavLink to="/overview" activeClassName="is-active" exact>Financials</NavLink>
        <NavLink to="/overview/rosters" activeClassName="is-active" exact>Rosters</NavLink>
      </React.Fragment>
    );
  }
}

class HeaderPlayers extends React.Component {
  render() {
    return (
      <React.Fragment>
        <NavLink to="/players" activeClassName="is-active" exact>All Players</NavLink>
        <NavLink to="/players/tags" activeClassName="is-active" exact>Tags</NavLink>
      </React.Fragment>
    );
  }
}

const headerButtonLeft = props => {
  const path = props.path;
  // a franchise page
  if (props.match.params.slug) {
    return <button><span className={`flag ${props.match.params.slug}`}></span></button>;
  }
  else {
    return null;
  }
};

class Header extends React.Component {
  constructor(props) {
    super(props);
    this.reloadData = this.reloadData.bind(this);
  }
  reloadData(e) {
    // if clicked button
    if (e.target.nodeName.toUpperCase() === 'BUTTON') {
      e.target.querySelector('svg').classList.add('fa-spin');
    }
    // if clicked svg
    else if (e.target.nodeName.toUpperCase() === 'SVG') {
      e.target.classList.add('fa-spin');
    }
    // clear the storage
    sessionStorage.clear();
    // reload the page
    location.reload();
  }
  render() {
    const title = this.props.match.params.slug ? getFranchiseTitle(this.props.data.franchises, this.props.match.params.slug) : this.props.title;
    return (
      <header id="header" className={this.props.match.params.slug && this.props.match.params.slug}>
        <div className="primary">
          {headerButtonLeft(this.props)}
          <h1>{title}</h1>
          <button onClick={this.reloadData}>
            <FontAwesomeIcon icon={faSyncAlt} />
          </button>
        </div>
        <div className="secondary">
          <Switch>
            <Route path="/overview" component={HeaderOverview} />
            <Route path="/draft" component={HeaderDraft} />
            <Route path="/players" component={HeaderPlayers} />
            <Route path="/teams/:slug" render={
              (props) => (<HeaderFranchise {...props} />)
            } />
          </Switch>
        </div>
      </header>
    );
  }
}

const mapStateToProps = (state) => {
  return state;
};

export default connect(mapStateToProps)(Header);
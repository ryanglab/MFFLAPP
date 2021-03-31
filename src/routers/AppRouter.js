import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import AuctionPage from '../components/AuctionPage';
import DraftPage from '../components/DraftPage';
import DraftRookiesPage from '../components/DraftRookiesPage';
import FranchiseCashPage from '../components/FranchiseCashPage';
import FranchiseOverviewPage from '../components/FranchiseOverviewPage';
import FranchisePicksPage from '../components/FranchisePicksPage';
import FranchiseRosterPage from '../components/FranchiseRosterPage';
import FrontOfficePage from '../components/FrontOfficePage';
import MenuPage from '../components/MenuPage';
import NotFoundPage from '../components/NotFoundPage';
import OverviewPage from '../components/OverviewPage';
import OverviewRostersPage from '../components/OverviewRostersPage';
import PlayersAvailablePage from '../components/PlayersAvailablePage';
import PlayersPage from '../components/PlayersPage';
import PlayersRFAsPage from '../components/PlayersRFAsPage';
import PlayersTagsPage from '../components/PlayersTagsPage';
import TeamsPage from '../components/TeamsPage';
import PageComponent from '../components/PageComponent';

class AppRouter extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route path="/" render={
            (props) => (<PageComponent component={FrontOfficePage} title="Front Office" {...props} />)
          } exact />
          <Route path="/auction" render={
            (props) => (<PageComponent component={AuctionPage} title="Auction" {...props} />)
          } exact />
          <Route path="/draft" render={
            (props) => (<PageComponent component={DraftPage} title="Draft" {...props} />)
          } exact />
          <Route path="/draft/rookies" render={
            (props) => (<PageComponent component={DraftRookiesPage} title="Rookies" {...props} />)
          } exact />
          <Route path="/menu" render={
            (props) => (<PageComponent component={MenuPage} title="Menu" {...props} />)
          } exact />
          <Route path="/overview" render={
            (props) => (<PageComponent component={OverviewPage} title="Financial Overview" {...props} />)
          } exact />
          <Route path="/overview/rosters" render={
            (props) => (<PageComponent component={OverviewRostersPage} title="Roster Overview" {...props} />)
          } exact />
          <Route path="/players" render={
            (props) => (<PageComponent component={PlayersPage} title="All Players" {...props} />)
          } exact />
          <Route path="/players/available" render={
            (props) => (<PageComponent component={PlayersAvailablePage} title="Best Available Players" {...props} />)
          } exact />
          <Route path="/players/rfas" render={
            (props) => (<PageComponent component={PlayersRFAsPage} title="Restricted Free Agents" {...props} />)
          } exact />
          <Route path="/players/tags" render={
            (props) => (<PageComponent component={PlayersTagsPage} title="Tagged Players" {...props} />)
          } exact />
          <Route path="/teams" render={
            (props) => (<PageComponent component={TeamsPage} title="Teams" {...props} />)
          } exact />
          <Route path="/teams/:slug" render={
            (props) => (<PageComponent component={FranchiseOverviewPage} title="Franchise" {...props} />)
          } exact />
          <Route path="/teams/:slug/roster" render={
            (props) => (<PageComponent component={FranchiseRosterPage} title="Franchise" {...props} />)
          } exact />
          <Route path="/teams/:slug/cash" render={
            (props) => (<PageComponent component={FranchiseCashPage} title="Franchise" {...props} />)
          } exact />
          <Route path="/teams/:slug/picks" render={
            (props) => (<PageComponent component={FranchisePicksPage} title="Franchise" {...props} />)
          } exact />
          <Route component={NotFoundPage} />
        </Switch>
      </BrowserRouter>
    );
  }
}

const mapStateToProps = (state) => {
  return state;
};

export default connect(mapStateToProps)(AppRouter);
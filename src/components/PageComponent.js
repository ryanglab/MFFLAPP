import React from 'react';
import { connect } from 'react-redux';
import Footer from './Footer';
import Header from './Header';
import DraftRookiesModal from './DraftRookiesModal';
import PlayersModal from './PlayersModal';
import TeamsModal from './TeamsModal';

class PageComponent extends React.Component {
  constructor(props) {
    super(props);
    this.handleScroll = this.handleScroll.bind(this);
    this.toggleDraftRookiesModal = this.toggleDraftRookiesModal.bind(this);
    this.togglePlayersModal = this.togglePlayersModal.bind(this);
    this.toggleTeamsModal = this.toggleTeamsModal.bind(this);
    this.state = {
      isDraftRookiesModalOpen: false,
      isPlayersModalOpen: false,
      isTeamsModalOpen: false
    };
  }
  componentDidMount() {
    document.querySelector('#main').addEventListener('scroll', this.handleScroll, true);
  }
  handleScroll() {
    let scrollTop = document.querySelector('#main').scrollTop;
  }
  componentDidUpdate(prevProps) {
    if (this.props.location !== prevProps.location) {
      // let appData = JSON.parse(sessionStorage['appData']);
      // let componentsArray = (!appData['components']) ? [] : appData['components'];
      // let currentComponent = componentsArray.find(x => x.path === this.props.location.pathname);
      // let scrollTop = (currentComponent) ? currentComponent.scrollTop : 0;

      // const playersDiv = document.querySelector('#players');
      // const scrollBody = playersDiv ? playersDiv : document.querySelector('#main');

      // scrollBody.scrollTo(0, scrollTop);
      // const scrollInt = setInterval(() => {
      //   if (scrollBody.scrollTop !== scrollTop) {
      //     scrollBody.scrollTop = scrollTop;
      //   } else {
      //     clearInterval(scrollInt);
      //   }
      // }, 10);
    }
  }
  toggleDraftRookiesModal() {
    this.setState((prevState) => ({
      isDraftRookiesModalOpen: !prevState.isDraftRookiesModalOpen
    }))
  }
  togglePlayersModal() {
    this.setState((prevState) => ({
      isPlayersModalOpen: !prevState.isPlayersModalOpen
    }))
  }
  toggleTeamsModal() {
    this.setState((prevState) => ({
      isTeamsModalOpen: !prevState.isTeamsModalOpen
    }))
  }
  render() {
    const Component = this.props.component;
    return (
      <React.Fragment>
        <Header
          togglePlayersModal={this.togglePlayersModal}
          isPlayersModalOpen={this.state.isPlayersModalOpen}
          toggleDraftRookiesModal={this.toggleDraftRookiesModal}
          isDraftRookiesModalOpen={this.state.isDraftRookiesModalOpen}
          {...this.props}
        />
        <main id="main" className={this.props.match.params.slug && this.props.match.params.slug}>
          <Component {...this.props} />
        </main>
        <Footer
          toggleTeamsModal={this.toggleTeamsModal}
          {...this.props}
        />
        <DraftRookiesModal
          toggleDraftRookiesModal={this.toggleDraftRookiesModal}
          isDraftRookiesModalOpen={this.state.isDraftRookiesModalOpen}
          {...this.props}
        />
        <PlayersModal
          togglePlayersModal={this.togglePlayersModal}
          isPlayersModalOpen={this.state.isPlayersModalOpen}
          {...this.props}
        />
        <TeamsModal
          toggleTeamsModal={this.toggleTeamsModal}
          isTeamsModalOpen={this.state.isTeamsModalOpen}
          {...this.props}
        />
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  return state;
};

export default connect(mapStateToProps)(PageComponent);
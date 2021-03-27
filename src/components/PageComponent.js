import React from 'react';
import { connect } from 'react-redux';
import Footer from './Footer';
import Header from './Header';
import TeamsModal from './TeamsModal';

class PageComponent extends React.Component {
  constructor(props) {
    super(props);
    this.toggleTeamsModal = this.toggleTeamsModal.bind(this);
    this.state = {
      isTeamsModalOpen: false
    };
  }
  componentDidUpdate(prevProps) {
    if (this.props.location !== prevProps.location) {
      document.querySelector('#main').scrollTo(0, 0);
    }
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
        <Header {...this.props} />
        <main id="main" className={this.props.match.params.slug && this.props.match.params.slug}>
          <Component {...this.props} />
        </main>
        <Footer toggleTeamsModal={this.toggleTeamsModal} {...this.props} />
        <TeamsModal toggleTeamsModal={this.toggleTeamsModal} isTeamsModalOpen={this.state.isTeamsModalOpen} {...this.props} />
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  return state;
};

export default connect(mapStateToProps)(PageComponent);
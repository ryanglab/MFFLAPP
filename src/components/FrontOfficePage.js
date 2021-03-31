import React from 'react';
import { connect } from 'react-redux';
import { setScrollPosition, updateScrollPosition } from '../utils';

class FrontOfficePage extends React.Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    setScrollPosition(this.props);
  }
  componentWillUnmount() {
    updateScrollPosition(this.props);
  }
  render() {
    return (
      <div>FrontOfficePage</div>
    );
  }
}

const mapStateToProps = (state) => {
  return state;
};

export default connect(mapStateToProps)(FrontOfficePage);
import React from 'react';
import { connect } from 'react-redux';

class FrontOfficePage extends React.Component {
  constructor(props) {
    super(props);
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
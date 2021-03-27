import React from 'react';
import { connect } from 'react-redux';

class NotFoundPage extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <p>Page not found!</p>
    );
  }
}

const mapStateToProps = (state) => {
  return state;
};

export default connect(mapStateToProps)(NotFoundPage);
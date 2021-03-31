import React from 'react';
import { connect } from 'react-redux';
import { sortArray, sortBy, sortIcons, setScrollPosition, updateScrollPosition } from '../utils';

class FranchisePicksPage extends React.Component {
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
    const slug = this.props.match.params.slug;
    const picks = sortArray(this.props.data.teampicks.filter((p) => {
      return p.fslug === slug;
    }), { sort: 'year', order: 'ASC' });
    return (
      <table>
        <thead>
          <tr>
            <th className="center">Year</th>
            <th className="center">Round</th>
            <th className="center">Pick</th>
            <th className="fullW">Via</th>
          </tr>
        </thead>
        <tbody>
          {
            picks.map((p, i) => {
              return (
                <tr key={i}>
                  <td className="center nowrap">{p.year}</td>
                  <td className="center nowrap">{p.round}</td>
                  <td className="center nowrap">{p.pick === 0 ? '\u2014' : p.pick}</td>
                  <td>{p.via}</td>
                </tr>
              );
            })
          }
        </tbody>
      </table>
    );
  }
}

const mapStateToProps = (state) => {
  return state;
};

export default connect(mapStateToProps)(FranchisePicksPage);
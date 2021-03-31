import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { sortArray, sortBy, sortIcons, setScrollPosition, updateScrollPosition } from '../utils';

class DraftPage extends React.Component {
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
    const key = this.props.filterKey;
    const sort = this.props.filters.sort;
    const order = this.props.filters.order;
    const draftpicks = sortArray(this.props.data.draft, { sort, order });
    const rounds = [...new Set(draftpicks.map(dp => dp.round))];
    rounds.sort();
    return (
      <React.Fragment>
        {
          rounds.map((rnd) => {
            return (
              <React.Fragment key={rnd}>
                <table>
                  <thead>
                    <tr>
                      <th className="center" colSpan="3">Round {rnd}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {
                      draftpicks.map((pick) => {
                        if (pick.round === rnd) {
                          return (
                            <tr key={pick.overall}>
                              <td className="center">{pick.overall}</td>
                              <td>
                                <Link to={`/teams/${pick.fslug}`}><span className={`flag ${pick.fslug}`}>{pick.fabbr}</span></Link>
                              </td>
                              <td className="fullW">
                                {pick.firstname} {pick.lastname}, {pick.pos} / {pick.team}
                              </td>
                            </tr>
                          );
                        }
                      })
                    }
                  </tbody>
                </table>
              </React.Fragment>
            );
          })
        }
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  const filterKey = 'draft';
  return {
    draft: state.data.draft,
    filters: state.data.filters[filterKey],
    filterKey
  }
};

export default connect(mapStateToProps)(DraftPage);
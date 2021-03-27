import React from 'react';
import { connect } from 'react-redux';
import { sortArray, sortBy, sortIcons } from '../utils';

class FranchiseRosterPage extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    const slug = this.props.match.params.slug;
    const roster = sortArray(this.props.data.players.filter((p) => {
      return p.fslug === slug;
    }), { sort: 'posid', order: 'ASC' });
    let activeRosterCount = 0;
    let rookieCorralCount = 0;
    return (
      <React.Fragment>
        <table>
          <thead>
            <tr>
              <th className="center header" colSpan="5">Active Roster</th>
            </tr>
            <tr>
              <th className="center">#</th>
              <th className="center">Pos</th>
              <th className="left">Player</th>
              <th className="center">Years</th>
              <th className="right">2021</th>
            </tr>
          </thead>
          <tbody>
            {
              roster.map((r) => {
                if (r.status === 'ACT') {
                  activeRosterCount++;
                  return (
                    <tr key={r.id}>
                      <td className="count center">{activeRosterCount}</td>
                      <td className="center">{r.pos}</td>
                      <td>{r.firstname} {r.lastname}, {r.team}</td>
                      <td className="center">{r.years}</td>
                      <td className="right">{r['2021'] == 0 ? '\u2014' : '$' + parseFloat(r['2021']).toFixed(2)}</td>
                    </tr>
                  );
                }
              })
            }
            {
              Array.from(Array(20 - activeRosterCount), (e, i) => {
                activeRosterCount++;
                return (
                  <tr key={i}>
                    <td className="count center">{activeRosterCount}</td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                  </tr>
                );
              })
            }
          </tbody>
        </table>
        <table>
          <thead>
            <tr>
              <th className="center header" colSpan="5">Rookie Corral</th>
            </tr>
            <tr>
              <th className="center">#</th>
              <th className="center">Pos</th>
              <th className="left">Player</th>
              <th className="center">Years</th>
              <th className="right">2021</th>
            </tr>
          </thead>
          <tbody>
            {
              roster.map((r) => {
                if (r.status === 'RC') {
                  rookieCorralCount++;
                  return (
                    <tr key={r.id}>
                      <td className="count center">{rookieCorralCount}</td>
                      <td className="center">{r.pos}</td>
                      <td>{r.firstname} {r.lastname}, {r.team}</td>
                      <td className="center">{r.years}</td>
                      <td className="right">{r['2021'] == 0 ? '\u2014' : '$' + parseFloat(r['2021']).toFixed(2)}</td>
                    </tr>
                  );
                }
              })
            }
            {
              Array.from(Array(9 - rookieCorralCount), (e, i) => {
                rookieCorralCount++;
                return (
                  <tr key={i}>
                    <td className="count center">{rookieCorralCount}</td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                  </tr>
                );
              })
            }
          </tbody>
        </table>
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  return state;
};

export default connect(mapStateToProps)(FranchiseRosterPage);
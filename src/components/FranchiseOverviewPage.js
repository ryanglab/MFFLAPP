import React from 'react';
import { connect } from 'react-redux';
import { sortArray, sortBy, sortIcons } from '../utils';

class FranchiseOverviewPage extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    const slug = this.props.match.params.slug;
    const franchise = this.props.data.franchises.filter((f) => {
      return f.slug === slug;
    });
    const draft = sortArray(this.props.data.draft.filter((d) => {
      return d.fslug === slug;
    }), { sort: 'overall', order: 'ASC' });
    const auction = sortArray(this.props.data.auction.filter((d) => {
      return d.fslug === slug;
    }), { sort: 'id', order: 'ASC' });

    return (
      <React.Fragment>
        <table>
          <thead>
            <tr>
              <th className="center" colSpan="2">Overview</th>
            </tr>
          </thead>
          <tbody>
            {
              franchise.map((f) => {
                return (
                  <React.Fragment key={f.id}>
                    <tr>
                      <td>Available Spots</td>
                      <td className="right">{f.spots}</td>
                    </tr>
                    <tr>
                      <td>Available Cap Space</td>
                      <td className="right">{f.space == 0 ? '\u2014' : '$' + parseFloat(f.space).toFixed(2)}</td>
                    </tr>
                    <tr>
                      <td>Available Cash</td>
                      <td className="right">{f.cash == 0 ? '\u2014' : '$' + parseFloat(f.cash).toFixed(2)}</td>
                    </tr>
                    <tr>
                      <td>Average Per Spot</td>
                      <td className="right">{f.avg == 0 ? '\u2014' : '$' + parseFloat(f.avg).toFixed(2)}</td>
                    </tr>
                    <tr>
                      <td>Max Bid</td>
                      <td className="right">{f.max == 0 ? '\u2014' : '$' + parseFloat(f.max).toFixed(2)}</td>
                    </tr>
                  </React.Fragment>
                );
              })
            }
          </tbody>
        </table>
        <table>
          <thead>
            <tr>
              <th className="center" colSpan="6">Draft Picks</th>
            </tr>
          </thead>
          <tbody>
            {draft.length === 0 ?
              <tr>
                <td colSpan="6">There are no draft picks.</td>
              </tr>
              :
              draft.map((d) => {
                return (
                  <tr key={d.overall}>
                    <td className="center">{d.round}.{String(d.pick).padStart(2, 0)}</td>
                    <td className="center">{d.overall}</td>
                    <td className="center">{d.pos}</td>
                    <td>{d.firstname} {d.lastname}, {d.team}</td>
                    <td className="right">{d.salary == 0 ? '\u2014' : '$' + parseFloat(d.salary).toFixed(2)}</td>
                  </tr>
                );
              })
            }
          </tbody>
        </table>
        <table>
          <thead>
            <tr>
              <th className="center" colSpan="3">Auction Signings</th>
            </tr>
          </thead>
          <tbody>
            {
              auction.map((a) => {
                return (
                  <tr key={a.id}>
                    <td className="fullW">{a.firstname} {a.lastname}, {a.team}</td>
                    <td className="center">{a.pos}</td>
                    <td className="right">{a.salary == 0 ? '\u2014' : '$' + parseFloat(a.salary).toFixed(2)}</td>
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

export default connect(mapStateToProps)(FranchiseOverviewPage);
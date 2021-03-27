import React from 'react';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTag } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import { sortArray, sortBy, sortIcons } from '../utils';

class PlayersPage extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    const key = this.props.filterKey;
    const sort = this.props.filters.sort;
    const order = this.props.filters.order;
    const players = sortArray(this.props.data.players, { sort, order });
    return (
      <table>
        <thead>
          <tr>
            <th
              className='center'
              data-key='rankview'
              onClick={(props) => { this.props.dispatch(sortBy({ key, sort, order, props })) }}
            >
              Rank{sort === 'rankview' ? sortIcons[order] : ''}
            </th>
            <th className='center'></th>
            <th
              className='center'
              data-key='posid'
              onClick={(props) => { this.props.dispatch(sortBy({ key, sort, order, props })) }}
            >
              Pos{sort === 'posid' ? sortIcons[order] : ''}
            </th>
            <th
              className='left fullW'
              data-key='firstname'
              onClick={(props) => { this.props.dispatch(sortBy({ key, sort, order, props })) }}
            >
              Player{sort === 'firstname' ? sortIcons[order] : ''}
            </th>
            <th className='center'></th>
            <th
              className='right'
              data-key='2021'
              onClick={(props) => { this.props.dispatch(sortBy({ key, sort, order, props })) }}
            >
              2021{sort === '2021' ? sortIcons[order] : ''}
            </th>
          </tr>
        </thead>
        <tbody>
          {
            players.map((p) => {
              return (
                <tr className={p['2021'] > 0 && p['type'] !== 'NFT' && p['type'] !== 'TT' ? 'taken' : ''} key={p.id}>
                  <td className="center">{p.rank}</td>
                  <td className="center nopad">
                    <Link to={`/teams/${p.fslug}`}><span className={`flag ${p.fslug}`}></span></Link>
                  </td>
                  <td className="center">{p.posrank}</td>
                  <td>
                    {p.firstname} {p.lastname}, {p.team}
                  </td>
                  <td className="nopad">
                    {p['type'] === 'EFT' || p['type'] === 'NFT' || p['type'] === 'TT' ?
                      <div className="tag">
                        <span>{p['type'].substring(0, 1)}</span>
                        <FontAwesomeIcon icon={faTag} />
                      </div> : ''
                    }
                  </td>
                  <td className="center">
                    {p['2021'] == 0 ? '\u2014' : '$' + parseFloat(p['2021']).toFixed(2)}
                  </td>
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
  const filterKey = 'players';
  return {
    players: state.data.players,
    filters: state.data.filters[filterKey],
    filterKey
  }
};

export default connect(mapStateToProps)(PlayersPage);
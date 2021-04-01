import React from 'react';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner, faTag } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import { filterPlayers, loadMore, sortBy, sortIcons, setScrollPosition, updateScrollPosition } from '../utils';

let isLoading = 0;

class PlayersTagsPage extends React.Component {
  constructor(props) {
    super(props);
    this.handleScroll = this.handleScroll.bind(this);
  }
  componentDidMount() {
    setScrollPosition(this.props);
    if (isLoading === 0 && document.querySelector('#main')) {
      document.querySelector('#main').addEventListener('scroll', this.handleScroll, true);
    }
  }
  componentWillUnmount() {
    updateScrollPosition(this.props);
    this.breakScroll();
  }
  breakScroll() {
    if (document.querySelector('#main')) {
      document.querySelector('#main').removeEventListener('scroll', this.handleScroll, true);
    }
  }
  handleScroll() {
    let playersHt = document.querySelector('#main').clientHeight;
    let scrollTop = document.querySelector('#main').scrollTop;
    let loaderTop = document.querySelector('#main tfoot').offsetTop;
    if (scrollTop + playersHt >= loaderTop) {
      if (isLoading === 0) {
        isLoading = 1;
        const num = this.props.filters.num + this.props.filters.inc
        this.props.dispatch(loadMore({ key: this.props.filterKey, num }));
      }
    }
  }
  render() {
    const key = this.props.filterKey;
    const sort = this.props.filters.sort;
    const order = this.props.filters.order;
    const num = this.props.filters.num;
    const availability = 'tags';
    const positions = this.props.filters.positions;
    const players = filterPlayers(this.props.data.players, { sort, order, num, availability, positions });
    isLoading = (players.length % num === 0 && players.length > 0) ? 0 : 1;
    return (
      <table>
        <thead>
          <tr>
            <th
              className='center'
              data-key='rank'
              onClick={(props) => { this.props.dispatch(sortBy({ key, sort, order, props })) }}
            >
              #{sort === 'rank' ? sortIcons[order] : ''}
            </th>
            <th className='center'>&nbsp;</th>
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
            <th className='center'>&nbsp;</th>
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
        <tfoot className="more">
          <tr>
            <td colSpan="6">
              {isLoading === 0 && <FontAwesomeIcon icon={faSpinner} className="fa-spin" />}
            </td>
          </tr>
        </tfoot>
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

export default connect(mapStateToProps)(PlayersTagsPage);
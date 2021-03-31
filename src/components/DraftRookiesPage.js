import React from 'react';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { filterRookies, loadMore, sortBy, sortIcons, setScrollPosition, updateScrollPosition } from '../utils';

let isLoading = 0;

class DraftRookiesPage extends React.Component {
  constructor(props) {
    super(props);
    this.handleScroll = this.handleScroll.bind(this);
  }
  componentDidMount() {
    setScrollPosition(this.props);
    if (isLoading === 0 && document.querySelector('#players')) {
      document.querySelector('#players').addEventListener('scroll', this.handleScroll, true);
    }
  }
  componentWillUnmount() {
    updateScrollPosition(this.props);
    this.breakScroll();
  }
  breakScroll() {
    if (document.querySelector('#players')) {
      document.querySelector('#players').removeEventListener('scroll', this.handleScroll, true);
    }
  }
  handleScroll() {
    let playersHt = document.querySelector('#players').clientHeight;
    let scrollTop = document.querySelector('#players').scrollTop;
    let loaderTop = document.querySelector('#players tfoot').offsetTop;
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
    const positions = this.props.filters.positions;
    const players = filterRookies(this.props.data.rookies, { sort, order, num, positions });
    isLoading = (players.length % num === 0 && players.length > 0) ? 0 : 1;
    return (
      <div id="players">
        <table>
          <thead>
            <tr>
              <th
                className='center'
                data-key='rank'
                onClick={(props) => { this.props.dispatch(sortBy({ key, sort, order, props })) }}
              >
                Rank{sort === 'rank' ? sortIcons[order] : ''}
              </th>
              <th
                className='center'
                data-key='pos'
                onClick={(props) => { this.props.dispatch(sortBy({ key, sort, order, props })) }}
              >
                Pos{sort === 'pos' ? sortIcons[order] : ''}
              </th>
              <th
                className='left fullW'
                data-key='firstname'
                onClick={(props) => { this.props.dispatch(sortBy({ key, sort, order, props })) }}
              >
                Player{sort === 'firstname' ? sortIcons[order] : ''}
              </th>
            </tr>
          </thead>
          <tbody>
            {
              players.map((p) => {
                return (
                  <tr key={p.id}>
                    <td className={`center` + (sort === 'rank' ? ' active' : '')}>{p.rank}</td>
                    <td className={`center` + (sort === 'pos' ? ' active' : '')}>{p.pos}</td>
                    <td className={`left` + (sort === 'firstname' ? ' active' : '')}>{p.firstname} {p.lastname}, {p.team}</td>
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
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  const filterKey = 'draftRookies';
  return {
    rookies: state.data.rookies,
    filters: state.data.filters[filterKey],
    filterKey
  }
};

export default connect(mapStateToProps)(DraftRookiesPage);
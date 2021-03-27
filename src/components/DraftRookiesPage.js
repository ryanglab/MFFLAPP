import React from 'react';
import { connect } from 'react-redux';
import { sortArray, sortBy, sortIcons } from '../utils';

class DraftRookiesPage extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    const key = this.props.filterKey;
    const sort = this.props.filters.sort;
    const order = this.props.filters.order;
    const rookies = sortArray(this.props.data.rookies, { sort, order });
    return (
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
            rookies.map((r) => {
              return (
                <tr key={r.id}>
                  <td className={`center` + (sort === 'rank' ? ' active' : '')}>{r.rank}</td>
                  <td className={`center` + (sort === 'pos' ? ' active' : '')}>{r.pos}</td>
                  <td className={`left` + (sort === 'firstname' ? ' active' : '')}>{r.firstname} {r.lastname}, {r.team}</td>
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
  const filterKey = 'draftRookies';
  return {
    rookies: state.data.rookies,
    filters: state.data.filters[filterKey],
    filterKey
  }
};

export default connect(mapStateToProps)(DraftRookiesPage);
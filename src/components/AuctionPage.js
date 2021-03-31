import { update } from 'lodash';
import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { sortArray, sortBy, sortIcons, setScrollPosition, updateScrollPosition } from '../utils';

class AuctionPage extends React.Component {
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
    const players = sortArray(this.props.data.auction, { sort, order });
    return (
      <table>
        <thead>
          <tr>
            <th
              className='center'
              data-key='id'
              onClick={(props) => { this.props.dispatch(sortBy({ key, sort, order, props })) }}
            >
              #{sort === 'id' ? sortIcons[order] : ''}
            </th>
            <th
              className='center'
              data-key='fabbr'
              onClick={(props) => { this.props.dispatch(sortBy({ key, sort, order, props })) }}
            >
              Team{sort === 'fabbr' ? sortIcons[order] : ''}
            </th>
            <th
              className='left fullW'
              data-key='firstname'
              onClick={(props) => { this.props.dispatch(sortBy({ key, sort, order, props })) }}
            >
              Player{sort === 'firstname' ? sortIcons[order] : ''}
            </th>
            <th
              className='right'
              data-key='salary'
              onClick={(props) => { this.props.dispatch(sortBy({ key, sort, order, props })) }}
            >
              Salary{sort === 'salary' ? sortIcons[order] : ''}
            </th>
          </tr>
        </thead>
        <tbody>
          {
            players.map((p, x) => {
              const num = (sort === 'id' && order === 'DESC') ? players.length - x : x + 1;
              return (
                <tr key={p.id}>
                  <td className={`center` + (sort === 'id' ? ' active' : '')}>{num}</td>
                  <td className={`center` + (sort === 'fabbr' ? ' active' : '')}>
                    <Link to={`/teams/${p.fslug}`}><span className={`flag ${p.fslug}`}>{p.fabbr}</span></Link>
                  </td>
                  <td className={`left` + (sort === 'firstname' ? ' active' : '')}>
                    {p.firstname} {p.lastname}, {p.pos} / {p.team}
                  </td>
                  <td className={`center` + (sort === 'salary' ? ' active' : '')}>${parseFloat(p.salary).toFixed(2)}</td>
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
  const filterKey = 'auction';
  return {
    auction: state.data.auction,
    filters: state.data.filters[filterKey],
    filterKey
  }
};

export default connect(mapStateToProps)(AuctionPage);
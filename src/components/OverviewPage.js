import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { sortArray, sortBy, sortIcons } from '../utils';

class OverviewPage extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    const key = this.props.filterKey;
    const sort = this.props.filters.sort;
    const order = this.props.filters.order;
    const franchises = sortArray(this.props.data.franchises, { sort, order });
    return (
      <table>
        <thead>
          <tr>
            <th
              className='left'
              data-key='team'
              onClick={(props) => { this.props.dispatch(sortBy({ key, sort, order, props })) }}
            >
              Team{sort === 'team' ? sortIcons[order] : ''}
            </th>
            <th
              className='center'
              data-key='spots'
              onClick={(props) => { this.props.dispatch(sortBy({ key, sort, order, props })) }}
            >
              Spots{sort === 'spots' ? sortIcons[order] : ''}
            </th>
            <th
              className='center'
              data-key='cap'
              onClick={(props) => { this.props.dispatch(sortBy({ key, sort, order, props })) }}
            >
              Cap{sort === 'cap' ? sortIcons[order] : ''}
            </th>
            <th
              className='center'
              data-key='avg'
              onClick={(props) => { this.props.dispatch(sortBy({ key, sort, order, props })) }}
            >
              Avg{sort === 'avg' ? sortIcons[order] : ''}
            </th>
            <th
              className='center'
              data-key='max'
              onClick={(props) => { this.props.dispatch(sortBy({ key, sort, order, props })) }}
            >
              Max{sort === 'max' ? sortIcons[order] : ''}
            </th>
          </tr>
        </thead>
        <tbody>
          {
            franchises.map((f) => {
              return (
                <tr key={f.id}>
                  <td className={`left` + (sort === 'team' ? ' active' : '')}><Link to={`/teams/${f.slug}`}><span className={`flag ${f.slug}`}>{f.abbr}</span></Link></td>
                  <td className={`center` + (sort === 'spots' ? ' active' : '')}>{f.spots}</td>
                  <td className={`center` + (sort === 'cap' ? ' active' : '')}>{f.cap == 0 ? '\u2014' : '$' + parseFloat(f.cap).toFixed(2)}</td>
                  <td className={`center` + (sort === 'avg' ? ' active' : '')}>{f.avg == 0 ? '\u2014' : '$' + parseFloat(f.avg).toFixed(2)}</td>
                  <td className={`center` + (sort === 'max' ? ' active' : '')}>{f.max == 0 ? '\u2014' : '$' + parseFloat(f.max).toFixed(2)}</td>
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
  const filterKey = 'overviewFinancials';
  return {
    franchises: state.data.franchises,
    filters: state.data.filters[filterKey],
    filterKey
  }
};

export default connect(mapStateToProps)(OverviewPage);
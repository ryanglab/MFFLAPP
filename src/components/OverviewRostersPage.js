import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { sortArray, sortBy, sortIcons } from '../utils';

class OverviewRostersPage extends React.Component {
  constructor(props) {
    super(props);
  }
  sumPos(array, pos) {
    let sum = 0;
    if (pos) {
      sum = array.reduce(function (prev, cur) {
        return prev + cur[pos];
      }, 0);
    }
    return sum;
  }
  render() {
    const key = this.props.filterKey;
    const sort = this.props.filters.sort;
    const order = this.props.filters.order;
    const franchises = sortArray(this.props.data.franchises, { sort, order });
    const sumQB = this.sumPos(franchises, 'qb');
    const sumRB = this.sumPos(franchises, 'rb');
    const sumWR = this.sumPos(franchises, 'wr');
    const sumTE = this.sumPos(franchises, 'te');
    const sumK = this.sumPos(franchises, 'k');
    const sumDST = this.sumPos(franchises, 'dst');
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
              data-key='qb'
              onClick={(props) => { this.props.dispatch(sortBy({ key, sort, order, props })) }}
            >
              QB{sort === 'qb' ? sortIcons[order] : ''}
            </th>
            <th
              className='center'
              data-key='rb'
              onClick={(props) => { this.props.dispatch(sortBy({ key, sort, order, props })) }}
            >
              RB{sort === 'rb' ? sortIcons[order] : ''}
            </th>
            <th
              className='center'
              data-key='wr'
              onClick={(props) => { this.props.dispatch(sortBy({ key, sort, order, props })) }}
            >
              WR{sort === 'wr' ? sortIcons[order] : ''}
            </th>
            <th
              className='center'
              data-key='te'
              onClick={(props) => { this.props.dispatch(sortBy({ key, sort, order, props })) }}
            >
              TE{sort === 'te' ? sortIcons[order] : ''}
            </th>
            <th
              className='center'
              data-key='k'
              onClick={(props) => { this.props.dispatch(sortBy({ key, sort, order, props })) }}
            >
              K{sort === 'k' ? sortIcons[order] : ''}
            </th>
            <th
              className='center'
              data-key='dst'
              onClick={(props) => { this.props.dispatch(sortBy({ key, sort, order, props })) }}
            >
              DST{sort === 'dst' ? sortIcons[order] : ''}
            </th>
          </tr>
          <tr className="bgwhite">
            <th>MFFL</th>
            <th className="center">{sumQB}</th>
            <th className="center">{sumRB}</th>
            <th className="center">{sumWR}</th>
            <th className="center">{sumTE}</th>
            <th className="center">{sumK}</th>
            <th className="center">{sumDST}</th>
          </tr>
        </thead>
        <tbody>
          {
            franchises.map((f) => {
              return (
                <tr key={f.id}>
                  <td className={`left` + (sort === 'team' ? ' active' : '')}><Link to={`/teams/${f.slug}`}><span className={`flag ${f.slug}`}>{f.abbr}</span></Link></td>
                  <td className={`center` + (sort === 'qb' ? ' active' : '')}>{f.qb}</td>
                  <td className={`center` + (sort === 'rb' ? ' active' : '')}>{f.rb}</td>
                  <td className={`center` + (sort === 'wr' ? ' active' : '')}>{f.wr}</td>
                  <td className={`center` + (sort === 'te' ? ' active' : '')}>{f.te}</td>
                  <td className={`center` + (sort === 'k' ? ' active' : '')}>{f.k}</td>
                  <td className={`center` + (sort === 'dst' ? ' active' : '')}>{f.dst}</td>
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
  const filterKey = 'overviewRosters';
  return {
    franchises: state.data.franchises,
    filters: state.data.filters[filterKey],
    filterKey
  }
};

export default connect(mapStateToProps)(OverviewRostersPage);
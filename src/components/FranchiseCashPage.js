import React from 'react';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMinus, faPlus } from '@fortawesome/free-solid-svg-icons';
import { sortArray, sortBy, sortIcons, setScrollPosition, updateScrollPosition } from '../utils';

class FranchiseCashPage extends React.Component {
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
    const slug = this.props.match.params.slug;
    let cashSpent = 0;
    const cash = sortArray(this.props.data.cash.filter((c) => {
      if (c.fslug === slug) {
        cashSpent += c.salary;
        return c;
      }
    }), { sort: 'id', order: 'ASC' });
    let cashAvailable = 100 - cashSpent;
    return (
      <table>
        <thead>
          <tr>
            <th>Cash Spent</th>
            <th className="right">${parseFloat(cashSpent).toFixed(2)}</th>
          </tr>
          <tr>
            <th>Cash Available</th>
            <th className="right">${parseFloat(cashAvailable).toFixed(2)}</th>
          </tr>
        </thead>
        <tbody>
          {
            cash.map((c) => {
              return (
                <tr key={c.id}>
                  <td className="left fullW">{c.description}</td>
                  <td className={`right nowrap ` + (c.salary < 0 ? 'credit' : 'debit')}>{c.salary < 0 ? <FontAwesomeIcon icon={faPlus} /> : <FontAwesomeIcon icon={faMinus} />}{c.salary == 0 ? '\u2014' : '$' + parseFloat(Math.abs(c.salary)).toFixed(2)}</td>
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
  return state;
};

export default connect(mapStateToProps)(FranchiseCashPage);
import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { sortArray, setScrollPosition, updateScrollPosition } from '../utils';

class TeamsPage extends React.Component {
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
    const franchises = sortArray(this.props.data.franchises, { sort: 'team', order: 'ASC' });
    const divisions = [...new Set(franchises.map(f => f.division))];
    divisions.sort();
    return (
      <React.Fragment>
        {
          divisions.map((d) => {
            return (
              <table className="teams" key={d}>
                <thead>
                  <tr>
                    <th className="center">{d} Division</th>
                  </tr>
                </thead>
                <tbody>
                  {
                    franchises.map((f) => {
                      if (f.division === d) {
                        return (
                          <tr key={f.id}>
                            <td>
                              <Link to={`/teams/${f.slug}`}>
                                <span className={`flag ${f.slug}`}>
                                  {f.team} {f.name}
                                </span>
                                <span className="owner">{f.owner}</span>
                              </Link>
                            </td>
                          </tr>
                        );
                      }
                    })
                  }
                </tbody>
              </table>
            );
          })
        }
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  return state;
};

export default connect(mapStateToProps)(TeamsPage);
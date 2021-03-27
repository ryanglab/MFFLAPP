import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { sortArray } from '../utils';

class TeamsPage extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    const franchises = sortArray(this.props.data.franchises, { sort: 'team', order: 'ASC' });
    const divisions = [...new Set(franchises.map(f => f.division))];
    divisions.sort();
    return (
      <table className="teams">
        {
          divisions.map((d) => {
            return (
              <React.Fragment key={d}>
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
              </React.Fragment>
            );
          })
        }
      </table>
    );
  }
}

const mapStateToProps = (state) => {
  return state;
};

export default connect(mapStateToProps)(TeamsPage);
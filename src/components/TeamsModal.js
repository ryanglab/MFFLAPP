import React from 'react';
import Modal from 'react-modal';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { sortArray } from '../utils';

class TeamsModal extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    if (!this.props.isTeamsModalOpen) {
      return (
        <div></div>
      );
    }
    else {
      const dirs = this.props.match.url.substring(1).split('/');
      const franchises = sortArray(this.props.data.franchises, { sort: 'team', order: 'ASC' });
      const divisions = [...new Set(franchises.map(f => f.division))];
      divisions.sort();
      return (
        <Modal
          isOpen={!!this.props.isTeamsModalOpen}
          contentLabel="Teams"
          ariaHideApp={false}
          style={{
            overlay: {
              backgroundColor: 'rgba(35, 40, 45, 0.75)'
            },
            content: {
              padding: '0px'
            }
          }}
        >
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
                            const url = `/teams/${f.slug}` + (dirs[2] ? `/${dirs[2]}` : '');
                            return (
                              <tr key={f.id}>
                                <td>
                                  <Link to={url} onClick={this.props.toggleTeamsModal}>
                                    <span className={`flag ${f.slug}`}>
                                      {f.team} {f.name}
                                    </span>
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
        </Modal>
      );
    }
  }
}

const mapStateToProps = (state) => {
  return state;
};

export default connect(mapStateToProps)(TeamsModal);
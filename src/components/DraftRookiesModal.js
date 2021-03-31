import React from 'react';
import Modal from 'react-modal';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck } from '@fortawesome/free-solid-svg-icons';

class DraftRookiesModal extends React.Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }
  handleClick(e, comp) {
    const pos = e.currentTarget.value;
    let posArr = comp.props.filters.positions.length >= 4 ? [] : comp.props.filters.positions;

    // if position exists in array, remove it...
    if (posArr.includes(pos)) {
      posArr.splice(posArr.indexOf(pos), 1);
    }
    // ...else, add it
    else {
      posArr.push(pos);
    }

    // if there are 0 items, 4 or more items, or "ALL" exists ... checkmark all
    if (posArr.length === 0 || posArr.length >= 4 || posArr.includes('ALL')) {
      posArr = ['QB', 'RB', 'WR', 'TE'];
    }

    comp.props.dispatch({
      type: 'SET_DRAFT_ROOKIE_FILTER',
      positions: posArr
    })
  }
  render() {
    const positionsChosen = this.props.filters.positions;
    const positionsArray = [
      {
        abbr: 'QB',
        name: 'Quarterbacks'
      },
      {
        abbr: 'RB',
        name: 'Running Backs'
      },
      {
        abbr: 'WR',
        name: 'Wide Receivers'
      },
      {
        abbr: 'TE',
        name: 'Tight Ends'
      }
    ]
    if (!this.props.isDraftRookiesModalOpen) {
      return (
        <div></div>
      );
    }
    else {
      return (
        <Modal
          isOpen={!!this.props.isDraftRookiesModalOpen}
          contentLabel="Rookies"
          onRequestClose={this.props.toggleDraftRookiesModal}
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
          <form onSubmit={(e) => { e.preventDefault() }}>
            <div className="content">
              <fieldset>
                <legend>Positions</legend>
                <div>
                  <button className={`option ${positionsChosen.length >= 4 ? 'selected' : ''}`} value="ALL" onClick={(e) => { this.handleClick(e, this); }}>
                    All Positions
                    {positionsChosen.length >= 4 && <FontAwesomeIcon icon={faCheck} />}
                  </button>
                </div>
                {
                  positionsArray.map((pos) => {
                    return (
                      <div key={pos.abbr}>
                        <button className={`option ${positionsChosen.length < 4 && positionsChosen.includes(pos.abbr) ? 'selected' : ''}`} value={pos.abbr} onClick={(e) => { this.handleClick(e, this); }}>
                          {pos.name}
                          {positionsChosen.length < 4 && positionsChosen.includes(pos.abbr) && <FontAwesomeIcon icon={faCheck} />}
                        </button>
                      </div>
                    );
                  })
                }
              </fieldset>
            </div>
            <div className="button">
              <button className="submit" type="button" onClick={this.props.toggleDraftRookiesModal}>Apply Filter</button>
            </div>
          </form>
        </Modal>
      );
    }
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

export default connect(mapStateToProps)(DraftRookiesModal);
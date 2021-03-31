import React from 'react';
import Modal from 'react-modal';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck } from '@fortawesome/free-solid-svg-icons';

class PlayersModal extends React.Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }
  handleClick(e, comp) {
    const pos = e.currentTarget.value;
    let posArr = comp.props.filters.positions.length >= 6 ? [] : comp.props.filters.positions;

    // if position exists in array, remove it...
    if (posArr.includes(pos)) {
      posArr.splice(posArr.indexOf(pos), 1);
    }
    // ...else, add it
    else {
      posArr.push(pos);
    }

    // if there are 0 items, 6 or more items, or "ALL" exists ... checkmark all
    if (posArr.length === 0 || posArr.length >= 6 || posArr.includes('ALL')) {
      posArr = ['QB', 'RB', 'WR', 'TE', 'K', 'DST'];
    }

    comp.props.dispatch({
      type: 'SET_PLAYER_FILTER',
      positions: posArr
    })
  }
  // handleClick(this) {
  //   console.log(this.props);
  // }
  // togglePlayersTaken(visibility) {
  //   return {
  //     type: 'SET_PLAYER_FILTER',
  //     showTaken: visibility
  //   }
  // }
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
      },
      {
        abbr: 'K',
        name: 'Kickers'
      },
      {
        abbr: 'DST',
        name: 'Defenses'
      }
    ]
    if (!this.props.isPlayersModalOpen) {
      return (
        <div></div>
      );
    }
    else {
      return (
        <Modal
          isOpen={!!this.props.isPlayersModalOpen}
          contentLabel="Players"
          onRequestClose={this.props.togglePlayersModal}
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
                  <button className={`option ${positionsChosen.length >= 6 ? 'selected' : ''}`} value="ALL" onClick={(e) => { this.handleClick(e, this); }}>
                    All Positions
                    {positionsChosen.length >= 6 && <FontAwesomeIcon icon={faCheck} />}
                  </button>
                </div>
                {
                  positionsArray.map((pos) => {
                    return (
                      <div key={pos.abbr}>
                        <button className={`option ${positionsChosen.length < 6 && positionsChosen.includes(pos.abbr) ? 'selected' : ''}`} value={pos.abbr} onClick={(e) => { this.handleClick(e, this); }}>
                          {pos.name}
                          {positionsChosen.length < 6 && positionsChosen.includes(pos.abbr) && <FontAwesomeIcon icon={faCheck} />}
                        </button>
                      </div>
                    );
                  })
                }
              </fieldset>
            </div>
            <div className="button">
              <button className="submit" type="button" onClick={this.props.togglePlayersModal}>Apply Filter</button>
            </div>
          </form>
        </Modal>
      );
    }
  }
}

const mapStateToProps = (state) => {
  return {
    players: state.data.players,
    filters: state.data.filters.players
  }
};

export default connect(mapStateToProps)(PlayersModal);
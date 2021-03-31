import { createStore, combineReducers } from 'redux';

const dataReducer = (state = {}, action) => {
  switch (action.type) {
    case 'SET_APP_DATA':
      return action.appData;
    case 'LOAD_MORE':
      return {
        ...state,
        filters: {
          ...state.filters,
          [action.key]: {
            ...state.filters[action.key],
            num: action.num
          }
        }
      };
    case 'SET_DRAFT_ROOKIE_FILTER':
      return {
        ...state,
        filters: {
          ...state.filters,
          draftRookies: {
            ...state.filters.players,
            positions: action.positions
          }
        }
      };
    case 'SET_PLAYER_FILTER':
      return {
        ...state,
        filters: {
          ...state.filters,
          players: {
            ...state.filters.players,
            positions: action.positions
          }
        }
      };
    case 'SORT_BY':
      return {
        ...state,
        filters: {
          ...state.filters,
          [action.key]: {
            ...state.filters[action.key],
            sort: action.sort,
            order: action.order
          }
        }
      };
    default:
      return state;
  }
}

export default () => {
  const store = createStore(
    combineReducers({
      data: dataReducer
    })
  );

  return store;
}
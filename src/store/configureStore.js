import { createStore, combineReducers } from 'redux';

const dataReducer = (state = {}, action) => {
  switch (action.type) {
    case 'SET_APP_DATA':
      return action.appData;
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
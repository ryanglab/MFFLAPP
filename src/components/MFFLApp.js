import React from 'react';
import { Provider } from 'react-redux';
import configureStore from '../store/configureStore';
import Loader from './Loader';
import AppRouter from '../routers/AppRouter';

const store = configureStore();

store.subscribe(() => {
  console.log(store.getState());
});

export default class MFFLApp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false
    };
  }
  componentDidMount() {
    console.log('##### INITIALIZE DATA #####');
    // does the data already exist in session storage?
    if (typeof (Storage) !== 'undefined' && sessionStorage['appData']) {
      console.log('sessionStorage data already exists ... no new load');
      this.setState({
        isLoaded: true,
        result: JSON.parse(sessionStorage.getItem('appData'))
      });
    } else {
      console.log('Load new data...');
      fetch('https://app.mchenryffl.com/data.php')
        .then(res => res.json())
        .then(
          (result) => {
            console.log(result);
            sessionStorage.setItem('appData', JSON.stringify(result));
            this.setState({
              isLoaded: true,
              result
            });
          },
          (error) => {
            this.setState({
              isLoaded: true,
              error
            });
          }
        )
    }
  }
  render() {
    const { error, isLoaded, result } = this.state;
    if (error) {
      return <div>Error: {error.message}</div>;
    }
    else if (!isLoaded) {
      return (
        <Loader />
      );
    }
    else {
      store.dispatch({
        type: 'SET_APP_DATA',
        appData: result
      });
      return (
        <Provider store={store}>
          <AppRouter />
        </Provider>
      )
    }
  }
}
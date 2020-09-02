import React from 'react';
import styles from './styles.css';
import imgScr from './logo.png';
import Header from './header';
import List from './ list';
import { Provider } from 'react-redux'
import store from './store'

const App = () => (
  <Provider store={store}>
    <div>
      <div className={styles.mainTitle}>Events List:</div>
      <Header />
      <List />
    </div>
  </Provider>
);
export default App;
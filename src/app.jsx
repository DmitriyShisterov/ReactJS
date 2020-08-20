import React from 'react';
import styles from './styles.css';
import imgScr from './logo.png';
import Header from './header';
import List from './ list';
const App = () => (
  <div>
    <div className={styles.mainTitle}>Events List:</div>
    <Header />
    <List />
  </div>
);
export default App;
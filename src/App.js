import React, { Component } from 'react';
import './App.css';
import Header from './components/Header';
import Books from './components/Books';
import firebase from './firebase';

class App extends Component {
  constructor() {
    super();
    this.state = {
      books: [],
    };
  }

  render() {
    return (
      <div className="App">
        <Header />
        <Books />
      </div>
    );
  }
}

export default App;

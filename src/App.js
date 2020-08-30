import React, { Component } from 'react';
import './App.css';
import Header from './components/Header';
import Books from './components/Books';
import firebase from './firebase';

// Items to complete for Book list app

  // user can create multiple lists, and they can name their lists 
  //  user cannot add a book to list if the book has already been added
  // if there is no results, display message that says "sorry, no results."
  // styling

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
        <div className="wrapper">
          <Header />
        </div>
          <Books />
      </div>
    );
  }
}

export default App;

import React, { Component } from 'react';
import './App.css';
import Header from './components/Header';
import Main from './components/Main';
import firebase from './firebase';

// Component Did Mount
  // Establish firebase call for inventory - Done
  // store inventory inside the array for books - Done
  // Set state - Done

// Render
  // Map through the books inventory array - Done
  // Display the books information - Done

  // For each book, attach a button to update the information on click event - Done
  // Add a new book button on click event

// Update 
  // Display a form preloaded with book info inside of input fields (only allowed to update inventory)
  // Listen to user input
  // Set state of user input

// On Add
  // display empty form with parameters for new book
  // On submit, add book to firebase and return to storefront homepage.

class App extends Component {
  constructor() {
    super();

    this.state = {
      books: [],
      newBookInput: "",
      bookUnitsToAdd: 0
    };
  }

  componentDidMount() {
    // Creating a variable that holds the reference to books inventory in Firebase
    const dbRef = firebase.database().ref();
    dbRef.on("value", response => {
      const booksData = response.val();

      const bookInventory = [];

      for (let title in booksData) {
        const bookInfo = {
          key: title,
          name: booksData[title]
        };

        bookInventory.push(bookInfo);
      }
      this.setState({
        books: bookInventory
      });
    });
  }

  // Filling out blank form for new book

  // book title
  updateTitle = event => {
    event.preventDefault();
    const userBookTitle = event.target.value;

    this.setState({
      newBookTitle: userBookTitle
    });
  };

  // author
  updateAuthor = event => {
    event.preventDefault();
    const userAuthor = event.target.value;

    this.setState({
      newAuthor: userAuthor
    });
  };

  // publisher
  updatePublisher = event => {
    event.preventDefault();
    const userPublisher = event.target.value;

    this.setState({
      newPublisher: userPublisher
    });
  };

  // subject
  updateSubject = event => {
    event.preventDefault();
    const userSubject = event.target.value;

    this.setState({
      newSubject: userSubject
    });
  };

  // balance on hand
  updateBalanceOnHand = event => {
    event.preventDefault();

    const userBalanceOnHand = event.target.value;
    this.setState({
      newBalanceOnHand: userBalanceOnHand
    });
  };

  // Adding a new book to the database
  newBookSubmission = event => {
    event.preventDefault();
    const formDb = firebase.database().ref();

    formDb.update({
      [`${this.state.newBookTitle}`]: {
        author: this.state.newAuthor,
        subject: this.state.newSubject,
        balanceOnHand: this.state.newBalanceOnHand,
        publisher: this.state.newPublisher
      }
    });
  };

  // Updating the balance on hand for each book in the database (on at a time)
  updateInventory = (event, bookKey, currentBookBalance) => {
    event.preventDefault();
    const bookDbRef = firebase.database().ref(`/${bookKey}`);
    const convertToNum = parseInt(currentBookBalance);

    bookDbRef.update({
      balanceOnHand: convertToNum + this.state.bookUnitsToAdd
    });
  };

  // Setting updateBookUnits to state
  updateBookUnits = event => {
    const convertToNumber = parseInt(event.target.value);
    this.setState({
      bookUnitsToAdd: convertToNumber
    });
  };

  // componentDidUpdate() {
  //   console.log("component has updated");

  //   this.setState = {

  //   }
  // }

  render() {
    return (
      <div className="App">
        <Header />
        <Main />

        {/* Blank form to submit new book information (name and key) to database */}
        <form className="newForm" action="submit">
          <fieldset>
            <legend>Please fill in the information below</legend>
            <label htmlFor="updateTitle">Book title</label>
            <input
              type="text"
              id="newBookTitle"
              onChange={this.updateBookTitle}
            ></input>

            <label htmlFor="updateAuthor">Author</label>
            <input type="text" id="newAuthor" onChange={this.newAuthor}></input>

            <label htmlFor="updatePublisher">Publisher</label>
            <input
              type="text"
              id="newPublisher"
              onChange={this.updatePublisher}
            ></input>

            <label htmlFor="updateSubject">Subject</label>
            <input
              type="text"
              id="newSubject"
              onChange={this.updateSubject}
            ></input>

            <label htmlFor="updateBalanceOnHand">Balance on Hand</label>
            <input
              type="number"
              id="newBalanceOnHand"
              onChange={this.updateBalanceOnHand}
            ></input>

            <button
              type="submit"
              onClick={event => {
                this.newBookSubmission();
              }}
            >
              Add new book
            </button>
          </fieldset>
        </form>

        <ul>
          {this.state.books.map((book, index) => {
            return (
              <li key={index}>
                <p>{book.key}</p>
                <p>Written by: {book.name.author}</p>
                <p>Units on hand: {book.name.balanceOnHand}</p>

                <form>
                  <label htmlFor="inventoryUpdate">
                    Enter # of Units to add
                  </label>
                  <input type="number" onChange={this.updateBookUnits}></input>
                  <button
                    onClick={event => {
                      this.updateInventory(
                        event,
                        book.key,
                        book.name.balanceOnHand
                      );
                    }}
                  >
                    Update Inventory
                  </button>
                </form>
              </li>
            );
          })}
        </ul>
      </div>
    );
  }
}

export default App;

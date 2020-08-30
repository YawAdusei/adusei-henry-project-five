import React, { Component } from "react";
import SearchArea from "./SearchArea";
import axios from "axios";
import firebase from "firebase";
import BookCard from "./BookCard";
import Footer from "./Footer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

const searchIcon = <FontAwesomeIcon icon={faSearch} size="2x" />;


class Books extends Component {
    constructor(props) {
        super(props);
        this.myRef = React.createRef();

        this.state = {
        books: [],
        searchField: "",
        sort: "",
        bookList: [],
        };
    }

// establishing connection to firebase log
    componentDidMount() {
        const dbRef = firebase.database().ref("bookList");
            dbRef.on("value", (snapshot) => {
            const data = snapshot.val();
            const bookList = [];
                for (let key in data) {
                    const bookInfo = {
                    key: key,
                    name: data[key],
                    };
                    bookList.push(bookInfo);
                }
                this.setState({
                    bookList: bookList,
                });
            });
    }

  // Add a book to the Book list 
    addToBookList(book) {
        const dbRef = firebase.database().ref("bookList");
        dbRef.push(book);
    }

// Remove a book from the book list
    removeFromBookList = (book) => {
        const dbRef = firebase.database().ref("bookList");
        dbRef.child(book).remove();
    };

  // this method will set the state every time we input into the input box.
    handleSearch = (e) => {
        console.log(e.target.value);
        this.setState({
            searchField: e.target.value,
        });
    };

  // this method will call the api and search for books when the form is submitted
    searchBook = (e) => {
        e.preventDefault();
        const apiKey = "AIzaSyBqTK7Yg9I-VNwKgb9Md0W6K0VanuDIBIM";
        const q = this.state.searchField;
        const maxResults = 40;
        const startIndex = 0;
        axios
            .get(
                `https://www.googleapis.com/books/v1/volumes?q=${q}&key=${apiKey}&maxResults=${maxResults}&startIndex=${startIndex}`
            )
            .then((data) => {
                console.log(data);
                this.setState({ books: [...data.data.items] });
            })
            .catch(() => {
                this.setState({
                hasError: false,
                });
            });
            this.setState({
                searchField: "",
            });
            this.scrollToMyRef(this.myRef);
    };

    scrollToMyRef = () => window.scrollTo(0, this.myRef.current.offsetTop);

    render() {
        return (
            <div>
                <div className="wrapper">
                    <div className="main" ref={this.myRef}>
                            <SearchArea
                                searchBook={this.searchBook}
                                handleSearch={this.handleSearch}
                            />
                    </div>
                </div>
                    {!this.state.books ? (
                        <h2>There were no matches, please try again</h2>
                    ) : (
                        <ul className="results">
                            {this.state.books.map((book) => {
                                return (
                                <BookCard
                                    key={book.id}
                                    info={book}
                                    addToBookList={this.addToBookList}
                                />
                                );
                            })}
                        </ul>

            )}

            <div className="wrapper">
                <div className="bookList">
                    <div className="bookListContainer">
                        <h2 className="bookListHeading" id="booklist">My Book List</h2>
                        <a href="#search" className='backToSearchLink'>{searchIcon}Back to Search</a>
                    </div>
                    <div className="bookListContent">
                        {this.state.bookList.map((book) => {
                            return (
                                <div key={book.key}>
                                    <div className="bookListCardContainer">
                                        <img src={book.name.imageLinks.thumbnail} alt={book.name.title} />
                                        <div className="book-description">
                                            <h3>{book.name.title}</h3>
                                            <h4>Written by: {book.name.authors && book.name.authors.length > 1 ? book.name.authors.join(", ") : book.name.authors}</h4>
                                        </div>
                                        <button onClick={ () => {this.removeFromBookList(book.key) }}>Remove from Book list</button>  
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </div>
            </div>
                <Footer />
        </div>
        );
    }
}

export default Books;

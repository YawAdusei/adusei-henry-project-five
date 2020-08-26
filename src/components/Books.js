import React, { Component } from "react";
import SearchArea from "./SearchArea";
import axios from "axios";
import firebase from "firebase";
import BookCard from "./BookCard";

class Books extends Component {
    constructor(props) {
        super(props);
        this.myRef = React.createRef();

        this.state = {
        books: [],
        searchField: "",
        sort: "",
        updatedBookList: [],
        };
    }

// establishing connection to firebase log
    componentDidMount() {
        const dbRef = firebase.database().ref("updatedBookList");
            dbRef.on("value", (snapshot) => {
            const data = snapshot.val();
            const updatedBookList = [];
                for (let key in data) {
                    const bookInfo = {
                    key: key,
                    name: data[key],
                    };
                    updatedBookList.push(bookInfo);
                }
                this.setState({
                    updatedBookList: updatedBookList,
                });
            });
    }

  // Add a book to the Book list 
    addToBookList(book) {
        const dbRef = firebase.database().ref("updatedBookList");
        dbRef.push(book);
    }

// Remove a book from the book list
    removeFromBookList = (book) => {
        const dbRef = firebase.database().ref("updatedBookList");
        dbRef.child(book).remove();
    };

  // this method will set our state every time we input into the input box.
    handleSearch = (e) => {
        console.log(e.target.value);
        this.setState({
        searchField: e.target.value,
        });
    };

  // this method will call the api and search for books 
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
            .catch((error) => {
                alert(error);
                this.setState({
                hasError: false,
                });
            });
            this.setState({
            searchField: "",
            });
        this.scrollToMyRef(this.myRef);
    };

  // this method will sort the results
    handleSort = (e) => {
        this.setState({
        sort: e.target.value,
        });
    };

    scrollToMyRef = () => window.scrollTo(0, this.myRef.current.offsetTop);

    render() {
        const filteredBooks = this.state.books.sort((a, b) => {
        if (this.state.sort == "Newest") {
            return (
            parseInt(b.volumeInfo.publishedDate.substring(0, 4)) -
            parseInt(a.volumeInfo.publishedDate.substring(0, 4))
            );
        } else if (this.state.sort == "Oldest") {
            return (
            parseInt(a.volumeInfo.publishedDate.substring(0, 4)) -
            parseInt(b.volumeInfo.publishedDate.substring(0, 4))
            );
        }
        return;
        });

    return (
        <div>
            <div className="main" ref={this.myRef}>
                <SearchArea
                    searchBook={this.searchBook}
                    handleSearch={this.handleSearch}
                    handleSort={this.handleSort}
                />
            </div>
            <div className="results">
                {this.state.books.map((book) => {
                    return (
                    <BookCard
                        key={book.id}
                        info={book}
                        addToBookList={this.addToBookList}
                    />
                    );
                })}
            </div>
            <div className="bookList">
                <div className="bookListContainer">
                    <h2 className="bookListHeading" id="booklist">My Book List</h2>
                    <a href="#search" className='backToSearchLink'><i className="fas fa-search"></i>Back to Search</a>
                </div>
                <div className="bookListContent">
                    {this.state.updatedBookList.map((book) => {
                        return (
                            <div key={book.key}>
                                <div className="bookListCardContainer">
                                    <img src={book.name.imageLinks.thumbnail} alt={book.name.title} />
                                    <div className="book-description">
                                        <h3>{book.name.title}</h3>
                                        <h4>Written by: {book.name.authors}</h4>
                                    </div>
                                    <button onClick={ () => {this.removeFromBookList(book.key) }}>Remove from Book list</button>  
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>
        </div>
        );
    }
}

export default Books;

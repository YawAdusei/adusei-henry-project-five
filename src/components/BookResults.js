import React from "react";
import BookCard from "./BookCard";

const BookResults = (props) => {

    
    return (
        <div className="results">
            {
                props.books.map((book) => {
                    return (
                        <BookCard
                            key={book.id}
                            info={book}
                            list={props.addToBookList}
                            // image={book.volumeInfo.imageLinks.thumbnail}
                            // title={book.volumeInfo.title}
                            // author={book.volumeInfo.authors}
                            // publisher={book.volumeInfo.publisher}
                            // published={book.volumeInfo.publishedDate}
                            // purchaseLink={book.volumeInfo.infoLink}
                            
                        />
                    );
                })
            }
        </div>
    );
}


    


export default BookResults;
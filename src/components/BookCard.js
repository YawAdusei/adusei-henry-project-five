import React from "react";

const BookCard = (props) => {
    const { volumeInfo } = props.info === undefined ? "No results" : props.info ;
    const { title, authors, publisher, infoLink, subtitle, publishedDate } = props.info.volumeInfo;
    const thumbNail = volumeInfo.hasOwnProperty('imageLinks') == false ? "https://i.imgur.com/sJ3CT4V.gif" : volumeInfo.imageLinks.thumbnail;
    const publishYear = volumeInfo.hasOwnProperty('publishedDate') == false ? volumeInfo['publishedDate'] = "0000" : volumeInfo.publishedDate;
    return (
        <li className="card-container">
            <img src={thumbNail} alt={title} />
            <div className="book-description">
                <h3>{title}</h3>
                <h4>Written by: {authors && authors.length > 1 ? authors.join(", ") : authors}</h4>
                <p>Publisher: {publisher}, {publishYear == "0000" ? "Not available" : publishYear.substring(0,4)} </p>
                <a href={infoLink}>Buy the Book</a>
            </div>              
            <div className="addToBookList">
                <button onClick={() => props.addToBookList(volumeInfo)}>Add To Book List</button>       
            </div>
        </li>
        );
};

export default BookCard;

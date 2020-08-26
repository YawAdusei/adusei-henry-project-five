import React, { Component } from 'react';

class Header extends Component {
  render() {
    return (
      <div>
        <header>
          <div className="top-bar">
            <h1>WK</h1>
            <a href="#booklist">
              <i className="fas fa-book-reader"></i> Go to Bookshelf
            </a>
          </div>
        </header>
      </div>
    );
  }
}

export default Header;
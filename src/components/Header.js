import React, { Component } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBookReader } from "@fortawesome/free-solid-svg-icons";


const bookListIcon = <FontAwesomeIcon icon={faBookReader} size="4x" />;


class Header extends Component {
  render() {
    return (
      <div>
        <header>
          <div className="top-bar">
            <h1>My Booklist App</h1>

            <a href="#booklist">
              {bookListIcon}
            </a>
          </div>
        </header>
      </div>
    );
  }
}

export default Header;
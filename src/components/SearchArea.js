import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

const searchIcon = <FontAwesomeIcon icon={faSearch} size="2x" />;

const SearchArea = (props) => {
        return (
            <div>
                <div className="searchArea" id="search">
                    <form action="" 
                    onSubmit={props.searchBook}>
                        <input 
                        type="text" 
                        id="newBookTitle" 
                        name="search" 
                        placeholder="search by title, author, or subject"
                        onChange={props.handleSearch} 
                        value={props.searchField}
                        required></input>
                        <button type="submit" ref={props.myRef}>{searchIcon}
                        </button>
                    </form>
                </div>
            </div>
        );
}

export default SearchArea;

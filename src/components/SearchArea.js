import React from "react";

const SearchArea = (props) => {
        return (
            <div>
                <div className="searchArea">
                    <form action="" 
                    onSubmit={props.searchBook}>
                        <input 
                        type="text" 
                        id="newBookTitle" 
                        name="search" 
                        onChange={props.handleSearch} 
                        value={props.searchField}
                        required></input>
                        <button type="submit" ref={props.myRef}>Search for books
                        </button>
                        <select defaultValue="Sort" onChange={props.handleSort}>
                            <option disabled value="Sort">Sort</option>
                            <option value="Newest">Newest</option>
                            <option value="Oldest">Oldest</option>
                        </select>
                    </form>
                </div>
            </div>
        );
}

export default SearchArea;

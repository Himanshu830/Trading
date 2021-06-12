import React from "react";

const Search = ({ searchUser }) => {

    return (
        <div id="search-container">
            <input 
                type="text"
                placeholder="search"
                onChange={(e) => searchUser(e.target.value)}
            />
        </div>
    );  

};

export default Search;

import React, { Fragment, useState } from 'react';

const Search = ({onSearch}) => {
    const [term, setTerm] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        onSearch(term);
        setTerm('');
    }  

    const searchHtml = () => (
        <form className="form-inline my-2 my-lg-0">
            <input 
                type="text"
                value={term}
                onChange={(e) => setTerm(e.target.value)}
                className="form-control btn-sm mr-sm-2"
                placeholder="Search"
            />
            <button
                onClick={handleSubmit}
                className="btn btn-sm btn-outline-primary my-2 my-sm-0" 
                type="submit"
            >Search</button>
        </form>
    );

    return (
        <Fragment>
            { searchHtml() }
        </Fragment>
    )
};

export default Search;
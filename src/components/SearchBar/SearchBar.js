import React, { useContext } from 'react';
import classes from './SearchBar.module.css';
import useInput from '../hooks/useInput';
import useHttpReq from '../hooks/useHttpReq';
import BeerContext from '../../store/beer-context';
import searchIcon from '../../img/searchIcon.png';

const SearchBar = () => {

  const validateSearch = (value) => {
    return value.trim() !== '';
  }

  const { value: searchValue, isValid: searchIsValid, hasError: searchHasError, onChange: searchValueChangeHandler, onBlur: searchValueBlurHandler } = useInput(validateSearch);

  const beerCtx = useContext(BeerContext);
  

  const handleSearch = (event) => {
    event.preventDefault();
    console.log("Form submitting...");
    console.log(searchValue);

    beerCtx.updateBeerList(`https://api.punkapi.com/v2/beers?beer_name=${searchValue}&per_page=15`);

  }

  return (
    <form className={classes.searchBar} onSubmit={handleSearch} >
      <input 
        type="text"
        id="search" 
        className={classes.searchField} 
        placeholder="Search for your favorite beer..." 
        value={searchValue}
        onChange={searchValueChangeHandler} 
        onBlur={searchValueBlurHandler}
      >
      </input>
      <button type="submit" className={classes.searchBtn} onClick={handleSearch} >
        <img src={searchIcon}></img>
        <span>Search</span>
      </button>
    </form>
  )
}

export default SearchBar;
import React, { useContext, useState } from 'react';
import classes from './SearchBar.module.css';
import useInput from '../hooks/useInput';
import useHttpReq from '../hooks/useHttpReq';
import BeerContext from '../../store/beer-context';
import useWindowDimension from '../hooks/useWindowDimensions';
import searchIcon from '../../img/searchIcon.png';

const SearchBar = () => {

  const {width, height} = useWindowDimension();

  const [btnToggled, setBtnToggled] = useState(false);
  let placeholderVal;
  const validateSearch = (value) => { 
    return value.trim() !== '';
  }
  
  const { value: searchValue, isValid: searchIsValid, hasError: searchHasError, onChange: searchValueChangeHandler, onBlur: searchValueBlurHandler } = useInput(validateSearch);

  const beerCtx = useContext(BeerContext);

  const handleSearch = (event) => {
    event.preventDefault();

    if(!searchIsValid) {
      setBtnToggled(!btnToggled);
      return;
    }

    beerCtx.updateBeerList(`https://api.punkapi.com/v2/beers?beer_name=${searchValue}&per_page=15`);
  }

  if(btnToggled) {
    placeholderVal = 'e.g. Pilsner'; 
  } else {
    placeholderVal = "Search for your favorite beer..." 
  }

  return (
    <form className={`${classes.searchBar} ${btnToggled ? classes.toggled : ''}`} onSubmit={handleSearch} >
      <input 
        type="text"
        id="search" 
        className={classes.searchField}
        placeholder={placeholderVal} 
        value={searchValue}
        onChange={searchValueChangeHandler} 
        onBlur={searchValueBlurHandler}
      >
      </input>
      <button type="submit" className={classes.searchBtn} onClick={handleSearch} >
        {/* <img src={searchIcon}></img> */}
        {width > 800 && <span>Search</span>}
      </button>
    </form>
  )
}

export default SearchBar;
import React, { useState, useContext } from 'react';
import searchIcon from '../../img/searchIcon.png';
import classes from './FilterItem.module.css';
import useInput from '../hooks/useInput';
import BeerContext from '../../store/beer-context';

const FilterItem = (props) => {

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const beerCtx = useContext(BeerContext);

  const validateSearch = (value) => {
    return +value;
  }
  const { value: firstInputValue, isValid: firstInputIsValid, hasError: firstSearchHasError, onChange: firstInputValueChangeHandler, onBlur: firstInputValueBlurHandler } = useInput(validateSearch);

  const { value: secondInputValue, isValid: secondInputIsValid, hasError: secondSearchHasError, onChange: secondInputValueChangeHandler, onBlur: secondInputValueBlurHandler } = useInput(validateSearch);

  const handleClick = (event) => {
    event.stopPropagation();
    setIsMenuOpen(!isMenuOpen);
  }

  const handleFilterSearch = () => {
    if(!firstInputIsValid && !secondInputIsValid) {
      return;
    }
    if(firstInputIsValid && !secondInputIsValid) {
      beerCtx.updateBeerList(`https://api.punkapi.com/v2/beers?${props.name.toLowerCase()}_gt=${+firstInputValue}&per_page=15`);
    }
    if(!firstInputIsValid && secondInputIsValid) {
      beerCtx.updateBeerList(`https://api.punkapi.com/v2/beers?${props.name.toLowerCase()}_lt=${+secondInputValue}&per_page=15`);
    } 
    /* 
      else if 2 inputs are good, let user know that only one input should be specified
    */
  }

  return (
    <div className={classes.dropdownBox}>
      <div className={`${classes.menu} ${isMenuOpen ? classes.open : ""}`}>
        <div className={classes.menuItem}>
          <img src={props.icon}></img>
          <input 
            type="text"
            id="numSearch_1"
            className="gaga"
            placeholder="Greater than..."
            value={firstInputValue}
            onChange={firstInputValueChangeHandler}
            onBlur={firstInputValueBlurHandler}
          >
          </input>
        </div>
        <div className={classes.menuItem}>
          <img src={props.icon}></img>
          <input 
            type="text"
            id="numSearch_2"
            className="gaga"
            placeholder="Less than..."
            value={secondInputValue}
            onChange={secondInputValueChangeHandler}
            onBlur={secondInputValueBlurHandler}
          >
          </input>
        </div>
        <button className={classes.searchBtn} onClick={handleFilterSearch}>
          <img src={searchIcon}></img>
          <span>Search...</span>
        </button>
      </div>
      <button className={classes.filterBtn} onClick={handleClick}>
        {props.name}
        <span className={classes.icon}>
          <img src={props.icon}></img>
        </span>
      </button>
    </div>
  )
}

export default FilterItem;
import React from 'react';
import classes from './Header.module.css';
import logo from '../../img/logo.png';
import SearchBar from '../SearchBar/SearchBar';
import FavoriteCart from '../Cart/FavoriteCart';

const Header = () => {
  return (
    <header className={classes.header}>
      <div className={classes.logoArea}>
        <img src={logo}></img>
        <h2 className={classes.title}>BeerFind</h2>
      </div>
      <SearchBar />
      <FavoriteCart />
    </header>
  )
}

export default Header;
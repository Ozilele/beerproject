import React, { useContext, useEffect, useState } from 'react';
import classes from './FavoriteCart.module.css';
import bookmark from '../../img/bookmark.png';
import BeerContext from '../../store/beer-context';
import PreviewItem from '../Items/PreviewItem';

const cartFromLocalStorage = JSON.parse(localStorage.getItem("storedBeers") || "[]");

const FavoriteCart = () => {

  const beerCtx = useContext(BeerContext);
  const [defaultVal, setDefault] = useState(true);
  const [listOfFavBeers, setListOfFavBeers] = useState(cartFromLocalStorage);

  useEffect(() => {    
    if(defaultVal) {
      localStorage.setItem("storedBeers", JSON.stringify(cartFromLocalStorage));
      setDefault(false);
    } else {
      setListOfFavBeers(beerCtx.storedBeers);
    }
  }, [beerCtx.storedBeers]);

  return (
    <ul className={classes.navList}>
      <li className={classes.navItem}>
        <button className={classes.favoriteBtn}>
          <img src={bookmark} className={classes.bookmarkLogo}></img>
          <span>Bookmarks</span>
        </button>
        <div className={classes.bookmarks}>
          <ul className={classes.bookmarksList}>
            {listOfFavBeers?.length > 0 ? listOfFavBeers.map((favBeer, index) => {
              return (
                <PreviewItem
                  data={favBeer}
                  id={favBeer.id}
                  name={favBeer.name}
                  img_src={favBeer.img_src}
                  description={favBeer.description}
                  key={favBeer.key}
                  abv={favBeer.abv}
                  ibu={favBeer.bitterness}
                  ebc={favBeer.ebc}
                />
              )
            }) : ''}
          </ul>
        </div>
      </li>
    </ul>
  )
}

export default FavoriteCart;
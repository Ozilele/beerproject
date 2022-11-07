import React, { useContext, useEffect, useState } from 'react';
import classes from './FavoriteCart.module.css';
import bookmark from '../../img/bookmark.png';
import BeerContext from '../../store/beer-context';
import PreviewItem from '../Items/PreviewItem';

const FavoriteCart = () => {

  const beerCtx = useContext(BeerContext);
  const [listOfFavBeers, setListOfFavBeers] = useState([]);

  useEffect(() => {
    let storedItems = JSON.parse(localStorage.getItem("storedBeers"));
    console.log(storedItems);
    if(!storedItems || beerCtx.favoriteBeers.length > 0) {
      setListOfFavBeers(beerCtx.favoriteBeers);
    } else {
      setListOfFavBeers(storedItems);
    }
  }, [beerCtx.favoriteBeers, beerCtx.storedBeers]);

  const showFavoriteBeers = () => {

  }

  return (
    <ul className={classes.navList}>
      <li className={classes.navItem}>
        <button className={classes.favoriteBtn} onClick={showFavoriteBeers}>
          <img src={bookmark} className={classes.bookmarkLogo}></img>
          <span>Bookmarks</span>
        </button>
        <div className={classes.bookmarks}>
          <ul className={classes.bookmarksList}>
            {listOfFavBeers?.length > 0 ? listOfFavBeers.map((favBeer) => {
              return (
                <PreviewItem
                  data={favBeer}
                  id={favBeer.id}
                  name={favBeer.name}
                  img_src={favBeer.img_src}
                  description={favBeer.description}
                  key={favBeer.name}
                  abv={favBeer.abv}
                  ibu={favBeer.bitterness}
                  ebc={favBeer.bc}
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
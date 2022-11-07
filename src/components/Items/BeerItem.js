import React, { useContext } from 'react';
import classes from './BeerItem.module.css';
import viewMore from '../../img/viewMore.png';
import favorite from '../../img/favorite.png';
import BeerContext from '../../store/beer-context';
import BeerIcons from '../UI/BeerIcons';
import { Link } from 'react-router-dom';

const BeerItem = (props) => {

  const description = props.description.slice(0, 50);
  const beerCtx = useContext(BeerContext);
  const urlOfBeer = `/beers/${props.id}`;

  const handleClick = () => {
    beerCtx.addBeerToFav({
      data: props.wholeData,
      name: props.name,
      img_src: props.img_src,
      description: props.description,
      abv: props.alcoholByVolume,
      bitterness: props.bitterness,
      ebc: props.breweryConvention,
      id: props.id,
    });
    
  };

  const handleViewMoreOption = (event) => {
    console.log(event);
    beerCtx.setCurrViewedBeer(props.wholeData);
  };

  return (
      <li className={classes.beerItem}>
        <div className={classes.beerCart}>
          <div className={classes.beerImg}>
            <img src={props.img_src} alt="Beer"></img>
          </div>
          <div className={classes.beerContent}>
            <h3 className={classes.beerName}>
              {props.name}
            </h3>
            <p className={classes.beerDescription}>
              {`${description}...`}
            </p>
            <BeerIcons alcoholByVolume={props.alcoholByVolume} bitterness={props.bitterness} breweryConvention={props.breweryConvention} />
          </div>
          <div className={classes.beerBtns}>
            <button className={classes.addToFavBtn} onClick={handleClick}>
              <span>Add to favorites</span>
              <img src={favorite} alt="favorite"></img>
            </button>
            <Link to={urlOfBeer} className={classes.beerLink} onClick={handleViewMoreOption}>
              <button className={classes.viewMoreBtn}>
                <span>View More...</span>
                <img src={viewMore} alt="view More"></img>
              </button>
            </Link>
          </div>
        </div>
      </li>
  )
}

export default BeerItem;

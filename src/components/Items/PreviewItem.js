import React, { useContext } from 'react';
import { Link } from "react-router-dom";
import BeerContext from '../../store/beer-context';
import classes from './PreviewItem.module.css';
import percent from '../../img/percent.png';
import bitter from '../../img/bitter.png';
import brewery from '../../img/brewery.png';
import removeIcon from '../../img/minusIcon.png';
import viewMore from '../../img/more.png';

const PreviewItem = (props) => {
  const beerCtx = useContext(BeerContext);
  const urlOfBeer = `/beers/${props.id}`;

  const handleLinkClick = () => {
    beerCtx.setCurrViewedBeer(props.data);
  }

  const handleRemoveFromFav = () => {
    const data = JSON.parse(localStorage.getItem("storedBeers"));
    const updatedData = data.filter((beer) => beer.id !== props.id);
    localStorage.setItem("storedBeers", JSON.stringify([...updatedData]));
    beerCtx.removeBeerFromFav(props.id);
  }

  return (
      <li className={classes.preview}>
        <figure className={classes.previewFig}>
          <img src={props.img_src}></img>
        </figure>
        <div className={classes.previewData}>
          <h4>{props.name}</h4>
          <div className={classes.previewIcons}>
            <img src={percent} alt="%" className={classes.percent}>
            </img>
            <span>{props.abv}</span>
            <img src={bitter} alt="bitterness" className={classes.bitter}></img>
            <span>{props.ibu}</span>
            <img src={brewery} alt="brewery" className={classes.brewery}></img>
            <span>{props.ebc}</span>
          </div>
        </div>
        <div className={classes.previewItemBtns}>
          <button className={classes.removeBtn} onClick={handleRemoveFromFav}>
            <img src={removeIcon} alt="remove"></img>
          </button>
          <button>
            <Link to={urlOfBeer} className={classes.previewLink} onClick={handleLinkClick}>
              <img src={viewMore} alt="viewMore"></img>
            </Link>
          </button>
        </div>
      </li>
  )
}


export default PreviewItem;
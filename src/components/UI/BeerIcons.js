import React from "react";
import classes from "./BeerIcons.module.css";
import percent from '../../img/percent.png';
import bitter from '../../img/bitter.png';
import brewery from '../../img/brewery.png';

const BeerIcons = (props) => {
  return (
    <div className={classes.beerIcons}>
      <img src={percent} alt="%" className={classes.percent}>
      </img>
      <span>{props.alcoholByVolume}</span>
      <img src={bitter} alt="bitterness" className={classes.bitter}></img>
      <span>{props.bitterness}</span>
      <img src={brewery} alt="brewery" className={classes.brewery}></img>
      <span>{props.breweryConvention}</span>
    </div>
  );
}

export default BeerIcons;
import React from "react";
import classes from './BeerInfo.module.css';

const BeerInfo = (props) => {

  return (
    <div className={classes.beerInfo}>
      <img src={props.img_src} alt={props.alt}></img>
      <h3>{props.text}</h3>
      <div className={classes.value}>
        <span>{props.value}</span>
      </div>
    </div>
  );
}

export default BeerInfo;
import React, { useContext, useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import BeerContext from "../../store/beer-context";
import BeerInfo from "../UI/BeerInfo";
import IngredientItem from "../Items/IngredientItem";
import classes from './BeerDetails.module.css';
import percent from '../../img/percent.png';
import bitter from '../../img/bitter.png';
import brewery from '../../img/brewery.png';
import calendar from '../../img/calendar.png';
import ph from '../../img/ph.png';
import tip from '../../img/tip.png';
import fork from '../../img/fork.png';
import backIcon from '../../img/backIcon.png';


const BeerDetails = () => {
  const { id } = useParams();
  const beerCtx = useContext(BeerContext);
  const beerItems = beerCtx.listOfBeers;
  console.log(beerItems);

  let currViewedBeer;
  currViewedBeer = beerCtx.currentViewedBeer;
  
  if(Object.keys(currViewedBeer).length === 0 || !currViewedBeer) {
    let searchedBeer;
    searchedBeer = beerCtx.favoriteBeers.find((beer) => beer.id === +id);
    if(beerCtx.favoriteBeers.length === 0) {
      searchedBeer = JSON.parse(localStorage.getItem("storedBeers")).find((beer) => beer.id === +id);
    }
    currViewedBeer = searchedBeer;
  }

  const maltArr = currViewedBeer.ingredients ? currViewedBeer.ingredients.malt : currViewedBeer.data.ingredients.malt;
  const hopsArr = currViewedBeer.ingredients ? currViewedBeer.ingredients.hops : currViewedBeer.data.ingredients.hops;
  const hopsNames = hopsArr.map((hop) => hop.name);
  const ingredientsHopsSet = new Set(hopsNames);
  const ingredientsHopsArr = Array.from(ingredientsHopsSet);

  const dataForInfo = [
    {
      img_src: percent,
      img_alt: "Percent",
      textInfo: "Alcohol By Volume",
      value: currViewedBeer.abv,
    },
    {
      img_src: bitter,
      img_alt: "Bitterness",
      textInfo: "Bitterness",
      value: currViewedBeer.ibu ? currViewedBeer.ibu : currViewedBeer.bitterness,
    },
    {
      img_src: brewery,
      img_alt: "Brewery",
      textInfo: "Brewery Convention",
      value: currViewedBeer.ebc
    },
    {
      img_src: calendar,
      img_alt: "Calendar",
      textInfo: "First Brewed",
      value: currViewedBeer.first_brewed ? currViewedBeer.first_brewed : currViewedBeer.data.first_brewed,
    },
    {
      img_src: ph,
      img_alt: "PH",
      textInfo: "PH",
      value: currViewedBeer.ph ? currViewedBeer.ph : currViewedBeer.data.ph,
    },
  ];

  const foodpairing = currViewedBeer.food_pairing ? currViewedBeer.food_pairing : currViewedBeer.data.food_pairing; 

  // const yeast = currViewedBeer?.ingredients.yeast ? currViewedBeer.ingredients.yeast : currViewedBeer.data.ingredients.yeast;

  const handleComeback = () => {
    beerCtx.setCurrViewedBeer({});
  }

  return (
    <>
    <div className={classes.beerDetails}>
      <div className={classes.backBtn}>
        <Link to="/" onClick={handleComeback}>
          <button>
            <img src={backIcon} alt="back"></img>  
            <span>Back</span>
          </button>
        </Link>
      </div>
      <div className={classes.beerContainer}>
        <div className={classes.beerImg}>
          <img src={currViewedBeer.image_url ? currViewedBeer.image_url : currViewedBeer.data.image_url} alt="beer_img_fullView"></img>
          <h1 className={classes.beerName}>
            <span>{currViewedBeer.name}</span>
          </h1>
        </div>
        <div className={classes.beerContent}>
          <div className={classes.descriptionBox}>
            <h2 className={classes.description}>Description</h2>
            <p>{currViewedBeer.description}</p>
          </div>
          <div className={classes.brewersTips}>
            <div className={classes.tipsTitle}>
              <img src={tip} alt="Tip"></img>
              <h2>Brewers Tips</h2>
            </div>
            <p>{currViewedBeer.brewers_tips ? currViewedBeer.brewers_tips : currViewedBeer.data.brewers_tips}</p>
          </div>  
        </div>
        <div className={classes.beerInfoContainer}>
          {dataForInfo.map((infoData) => {
            return (
              <BeerInfo
                key={infoData.img_alt} 
                img_src={infoData.img_src}
                alt={infoData.img_alt}
                text={infoData.textInfo}
                value={infoData.value}
              />
            )            
          })}
          <div className={classes.tagline}>
            <h3>{currViewedBeer.tagline ? currViewedBeer.tagline : currViewedBeer.data.tagline}</h3>
          </div>
          <div className={classes.contributor}>
            <h3>Contributed by: </h3>
            <span>{currViewedBeer.contributed_by ? currViewedBeer.contributed_by : currViewedBeer.data.contributed_by}</span>
          </div>
        </div>
        <div className={classes.additionalInfo}>
          <div className={classes.ingredients}>
            <h2 className={classes.ingredientsHeading}>Ingredients</h2>
            <ul className={classes.ingredientsList}>
              {maltArr.length > 0 && maltArr.map((maltObj) => {
                return (
                  <IngredientItem 
                    key={maltObj.name}
                    name={maltObj.name}
                    amountVal={maltObj.amount.value}
                    unit={maltObj.amount.unit}
                />);
              })}
              {ingredientsHopsArr.map(ingredient => {
                return (
                  <IngredientItem
                    key={ingredient} 
                    name={ingredient}
                  />
                )
              })}
              <li className={classes.ingredient}>
                <div className={classes.yeast}>Yeast: </div>
              </li>
            </ul>
          </div>
          <div className={classes.pairingFood}>
            <div className={classes.pairingFoodHeading}>
              <img src={fork} alt="Fork"></img>
              <h3 className>Food pairing</h3>
            </div>
            <ul className={classes.pairingFoodList}>
              {foodpairing.map(food => {
                return (
                <IngredientItem
                  key={food}
                  name={food}
                />);
              })}
            </ul>
          </div>
        </div>
        

      </div>
    </div>
    </>
  );
}


export default BeerDetails;


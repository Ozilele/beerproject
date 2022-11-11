import React, { useEffect, useContext } from 'react';
import classes from './BeerList.module.css';
import BeerItem from '../Items/BeerItem';
import BeerContext from '../../store/beer-context';

const BeerList = (props) => {

  const beerCtx = useContext(BeerContext);
  const beerItems = beerCtx.listOfBeers;

  const handleForwardBtn = () => {
    beerCtx.goToPage({action: 'Next'});
  };

  const handleBackwardBtn = () => {
    beerCtx.goToPage({action: 'Previous'});
  }

  useEffect(() => {

    beerCtx.updateBeerList(`https://api.punkapi.com/v2/beers?per_page=15`);
  }, []);

  return (
    <ul className={classes.beerList}>
      {beerItems ? beerItems.map((beer) => {
        return (
          <BeerItem
            wholeData={beer} 
            name={beer.name}
            img_src={beer.image_url}
            description={beer.description}
            alcoholByVolume={beer.abv}
            bitterness={beer.ibu}
            tagline={beer.tagline}
            id={beer.id}
            key={Math.random() + ""}
            breweryConvention={beer.ebc}
          />);
      }): ''}

      <div className={classes.pagination}>
        {beerCtx.currentPage > 1 && <button className={classes.backwardBtn} onClick={handleBackwardBtn}>Page {beerCtx.currentPage - 1} </button>}
        <button className={classes.forwardBtn} onClick={handleForwardBtn}>Page {beerCtx.currentPage + 1}</button>
      </div>
    </ul>
  )
}

export default BeerList;
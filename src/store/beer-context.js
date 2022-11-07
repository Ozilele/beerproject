import React from 'react';

// React Context for adding favorite beers
const BeerContext = React.createContext({
  favoriteBeers: [],
  listOfBeers: [],
  storedBeers: [],
  currentViewedBeer: {},
  currentURL: '',
  currentPage: 1,
  goToPage: (setup) => {},
  setCurrViewedBeer: (beer) => {},
  updateBeerList: (url) => {},
  addBeerToFav: (beer) => {},
  removeBeerFromFav: (id) => {},
});

export default BeerContext;
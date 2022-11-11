import React, { useReducer, useState } from 'react';
import BeerContext from './beer-context';
import useHttpReq from '../components/hooks/useHttpReq';

const defaultBeerState = {
  favoriteBeers: [],
  currentViewedBeer: {},
  storedBeers: [],
};

const beerReducer = (state, action) => {

  let updatedItems;

  if(action.type === 'SET') {
    return {
      favoriteBeers: state.favoriteBeers,
      currentViewedBeer: action.beerObj,
      storedBeers: state.storedBeers
    }
  }

  if(action.type === 'ADD') {

    updatedItems = JSON.parse(localStorage.getItem("storedBeers") || "[]");
    return {
      favoriteBeers: updatedItems,
      currentViewedBeer: state.currentViewedBeer,
      storedBeers: updatedItems,
    };
  }

  if(action.type === 'INIT_ADDING_FROM_STORAGE') {
    updatedItems = state.favoriteBeers.concat(action.item);
    console.log(updatedItems);
    return {
      favoriteBeers: updatedItems,
      currentViewedBeer: state.currentViewedBeer,
      storedBeers: state.storedBeers,
    }
  }

  if(action.type === 'REMOVE') {
    updatedItems = state.favoriteBeers.filter((beer) => beer.id !== action.id);
    return {
      favoriteBeers: updatedItems,
      currentViewedBeer: state.currentViewedBeer,
      storedBeers: state.storedBeers
    };
  }

  return defaultBeerState;
};

const BeerProvider = (props) => {

  const [beerState, dispatchAction] = useReducer(beerReducer, defaultBeerState);
  const [listOfBeers, setListOfBeers] = useState([]);
  const [URL, setURL] = useState('');
  const [currPage, setCurrPage] = useState(1);

  const httpData = useHttpReq();
  const { error: beerError, isLoading: beerListIsLoading, sendHttpReq: fetchListOfBeers} = httpData;

  const changeBeerList = (url) => {
    let updatedList;
    const applyData = (data) => {
      updatedList = [...data];
      setListOfBeers(updatedList);
    }

    setURL(url);
    fetchListOfBeers({url: url}, applyData);
  }

  const setCurrViewedBeer = (beer) => {
    dispatchAction({type: 'SET', beerObj: beer});
  }

  const addBeerToFavHandler = (item) => {
    dispatchAction({type: 'ADD', item: item});
  }

  const addDataFromStorage = (item) => {
    dispatchAction({type: 'INIT_ADDING_FROM_STORAGE', item: item});
  }

  const removeBeerFromFavHandler = (id) => {
    dispatchAction({type: 'REMOVE', id: id});
  }

  const goToPage = (setup) => {

    let newURL;
    const indexOfPage = URL.lastIndexOf("page");
    if(setup.action === 'Next') {
      if(URL.endsWith(`page=${currPage}`)) {
        newURL = `${URL.slice(0, indexOfPage)}page=${currPage + 1}`;
      } 
      else {
        newURL = `${URL}&page=${currPage + 1}`;
      }
      setCurrPage(currPage + 1);
    }
    if(setup.action === 'Previous') {
      if(URL.endsWith(`page=${currPage}`)) {
        newURL = `${URL.slice(0, indexOfPage)}page=${currPage - 1}`;
      }
      else {
        newURL = `${URL}&page=${currPage - 1}`;
      }
      setCurrPage(currPage - 1);
    }

    changeBeerList(newURL);
  }

  const beerContext = {
    listOfBeers: listOfBeers,
    favoriteBeers: beerState.favoriteBeers,
    storedBeers: beerState.storedBeers,
    currentViewedBeer: beerState.currentViewedBeer,
    currentURL: URL,
    currentPage: currPage,
    goToPage: goToPage,
    setCurrViewedBeer: setCurrViewedBeer,
    updateBeerList: changeBeerList,
    addBeerToFav: addBeerToFavHandler,
    addDataFromStorage: addDataFromStorage,
    removeBeerFromFav: removeBeerFromFavHandler,
  }

  return <BeerContext.Provider value={beerContext} >
    {props.children}
  </BeerContext.Provider>
}


export default BeerProvider;
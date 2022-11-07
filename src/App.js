import './App.css';
import Header from './components/Header/Header';
import FilterBox from './components/Box/FilterBox';
import BeerList from './components/BeerList/BeerList';
import BeerProvider from './store/BeerProvider';
import BeerDetails from './components/BeerDetails/BeerDetails';
import React from 'react';
import { Route, Routes } from "react-router-dom";

function App() {

  return (
    <BeerProvider>

      <Header />
      <Routes>
        <Route path="/" element={<FilterBox />}>
          <Route index element={<BeerList/>} />
        </Route>
        <Route path="/beers">
          <Route path=":id" element={<BeerDetails/>} />
        </Route>
      </Routes>
    </BeerProvider>
  );
}

export default App;

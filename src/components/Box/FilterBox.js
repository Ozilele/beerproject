import React, { useState } from 'react';
import classes from './FilterBox.module.css';
import down from '../../img/down.png';
import more from '../../img/moreIcon.png';
import FilterItem from '../Items/FilterItem';
import { Outlet } from 'react-router-dom';

const FilterBox = () => {

  
  const filterItemsData = [
    {
      name: 'Abv',
      img_src: down,
    },
    {
      name: 'Ibu',
      img_src: down,
    },
    {
      name: 'Ebu',
      img_src: down,
    },
  ]

  return (
    <>
      <div className={classes.filterBox}>
        {/* <button className={classes.filterBtn}>
          <span className={classes.itemBox}>
            Abv
            <span className={classes.icon}>
              <img src={down}></img>
            </span>
          </span>
        </button> */}
        {filterItemsData.map((data) => {
          return (
          <FilterItem 
            key={data.name}
            name={data.name}
            icon={data.img_src}
          />
          );
        })}
        {/* <div className={`${classes.menu} ${isMenuOpen ? "open" : ""}`}>


        </div>
        <button className={classes.filterBtn}>
          <span className={classes.itemBox}>
            Ibu
            <span className={classes.icon}>
              <img src={down}></img>
            </span>
          </span>
        </button>  */}
        {/* <button className={classes.filterBtn}>
          <span className={classes.itemBox}>
            Ebu
            <span className={classes.icon}>
              <img src={down}></img>
            </span>
          </span>
        </button> */}
        {/* <button className={classes.filterMoreBtn}>
          <span className={classes.itemBox}>
            <span className={classes.icon}>
              <img src={more}></img>
            </span>
            <span className={classes.filterContent}>
              <button className={classes.quantityFilters}>1</button>
              More Filters
            </span>
          </span>
        </button> */}
      </div>
      <Outlet />
    </>
  )
}

export default FilterBox;

// SOURCES 
{/* <a target="_blank" href="https://icons8.com/icon/33934/view-more">View More</a> icon by <a target="_blank" href="https://icons8.com">Icons8</a> */}
import React, { useState } from 'react';
import classes from './FilterBox.module.css';
import down from '../../img/down.png';
import more from '../../img/moreIcon.png';
import useWindowDimension from '../hooks/useWindowDimensions';
import FilterItem from '../Items/FilterItem';
import { Outlet } from 'react-router-dom';

const FilterBox = () => {

  const {width, height} = useWindowDimension();
  let filterItemsData;
  
  if(width < 1200) {
    filterItemsData = [
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
  } else {
    filterItemsData = [
      {
        name: 'Alcohol Volume',
        img_src: down,
      },
      {
        name: 'Bitterness',
        img_src: down,
      },
      {
        name: 'Brewery Convention',
        img_src: down,
      },
      {
        name: 'First Brewed',
        img_src: down,
      },
      {
        name: 'Food Pairing',
        img_src: down,
      }
    ]
  }

  return (
    <>
      <div className={classes.filterBox}>
        {filterItemsData.map((data) => {
          return (
          <FilterItem 
            key={data.name}
            name={data.name}
            icon={data.img_src}
          />
          );
        })}
      </div>
      <Outlet />
    </>
  )
}

export default FilterBox;

// SOURCES 
{/* <a target="_blank" href="https://icons8.com/icon/33934/view-more">View More</a> icon by <a target="_blank" href="https://icons8.com">Icons8</a> */}
import React from "react";
import classes from "./IngredientItem.module.css";

const IngredientItem = (props) => {
  return (
    <li className={classes.ingredient}>
      <div className={classes.ingredientName}>{props.name}</div>
      {props.amountVal && <div className={classes.ingredientAmount}>
        {props.amountVal} {props.unit}
      </div>}
    </li>
  )
}

export default IngredientItem;
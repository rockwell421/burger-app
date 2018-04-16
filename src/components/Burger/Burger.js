import React, { Component } from 'react';
import classes from './Burger.css';
import BurgerIngredient from './BurgerIngredient/BurgerIngredient';

const burger = (props) => {
  //Need to transform the incoming ingredients state object of key value pairs into an array of ingredients so that we can dynamically add and remove ingredients
  //value of the object is important to decide how many ingredients we need
  //key is important for which type of ingredient needed
  let transformedIngredients =
    Object.keys(props.ingredients)
    .map(ingredientKey => {
        return [...Array(props.ingredients[ingredientKey])] //length is the amount of the given ingredients
        .map((_, i) => {
          return <BurgerIngredient key={ingredientKey + i} type={ingredientKey} />
        });
      })
      .reduce((arr, element) => {
        return arr.concat(element)
      }, [] );
      //flattens the ingredients array of objects so that we can add conditional logic

      if (transformedIngredients.length === 0) {
        transformedIngredients = <p>Please start adding ingredients</p>;
      }



  return (
    <div className={classes.Burger}>
      <BurgerIngredient type="bread-top" />
      {transformedIngredients}
      <BurgerIngredient type="bread-bottom" />
    </div>
  );
};

export default burger;

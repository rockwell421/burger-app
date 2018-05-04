import React from 'react';
import classes from './BuildControls.css';
import BuildControl from './BuildControl/BuildControl';

//create an array of labels to loop over and display, also provide the type to compare proptype
const controls =[
  { label: 'Salad', type: 'salad' },
  { label: 'Bacon', type: 'bacon' },
  { label: 'Cheese', type: 'cheese' },
  { label: 'Meat', type: 'meat' }
];

const buildControls = (props) => (
  <div className={classes.BuildControls}>
    <h3>Current Price: ${props.price.toFixed(2)}</h3>
    {controls.map(control => (
      <BuildControl
          key={control.label}
          label={control.label}
          added={() => props.ingredientAdded(control.type)}
          removed={() => props.ingredientRemoved(control.type)}
          disabled={props.disabled[control.type]} />
    ))}
      <button
          className={classes.OrderButton}
          disabled={!props.purchasable}
          onClick={props.ordered}>ORDER NOW
      </button>
  </div>
);



export default buildControls;

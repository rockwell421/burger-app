import React, { Component } from 'react';
import Aux from '../../hoc/Aux';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import axios from '../../axios-orders';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';

const INGREDIENT_PRICES = {
  salad: 0.5,
  cheese: 0.5,
  meat: 2,
  bacon: 2
}

class BurgerBuilder extends Component {
  state = {
    ingredients: {
      salad: 0,
      bacon: 0,
      cheese: 0,
      meat: 0
    },
    totalPrice: 4,
    purchasable: false,
    purchasing: false,
    loading: false
  }

  updatePurchaseState (ingredients) {
    //need to convert the object into an array so we can check the state value to activate or deactivate the purchase button
    const sum = Object.keys(ingredients)
      .map(ingredientKey => {
        return ingredients[ingredientKey]; //returns an array of values
      })
      .reduce((sum, el) => {
        //returns a single value
        return sum + el;
      }, 0);
      this.setState({purchasable: sum > 0}); //changes the state
  }

  addIngredientHandler = (type) => {
    const oldCount = this.state.ingredients[type];
    const updatedCount = oldCount + 1;

    //distributes the properties of the old ingredients state into the new object being created
    const updatedIngredients = {
      ...this.state.ingredients
    };
    updatedIngredients[type] = updatedCount;

    //track prices
    const priceAddition = INGREDIENT_PRICES[type];
    const oldPrice = this.state.totalPrice;
    const newPrice = oldPrice + priceAddition;
    this.setState({ totalPrice: newPrice, ingredients: updatedIngredients})
    this.updatePurchaseState(updatedIngredients);
  }

  removeIngredientHandler = (type) => {
    const oldCount = this.state.ingredients[type];

    if (oldCount <= 0) {
      return;
    }

    const updatedCount = oldCount - 1;
    const updatedIngredients = {
      ...this.state.ingredients
    };
    updatedIngredients[type] = updatedCount;
    const priceDeduction = INGREDIENT_PRICES[type];
    const oldPrice = this.state.totalPrice;
    const newPrice = oldPrice - priceDeduction;
    this.setState({totalPrice: newPrice,ingredients: updatedIngredients})
    this.updatePurchaseState(updatedIngredients);
  }

  purchaseHandler = () => {
    this.setState({purchasing:true});
  }

  purchaseCancelHandler = () => {
    this.setState({purchasing: false});
  }

//sends json object to DB
  purchaseContinueHandler = () => {

    this.setState({loading: true});

    const order = {
      ingredients: this.state.ingredients,
      price: this.state.totalPrice,
      customer: {
        name: 'Nacho Rockwell',
        address: {
          street: 'Test Street 1',
          zipCode: '45678',
          country: 'Canada'
        },
        email: 'test@test.com'
      },
      deliveryMethod: 'fastest'
    }
    axios.post('/orders.json', order)
      .then(response => {
        this.setState({loading: false, purchasing: false});
      })
      .catch(error => {
        this.setState({loading: false, purchasing: false});
      });
  }

  render() {

    //this will disable the buttons if the ingredients are 0
    const disabledInfo = {
      ...this.state.ingredients
    };
    for(let key in disabledInfo) {
      disabledInfo[key] = disabledInfo[key] <= 0
    }

    let orderSummary =     <OrderSummary
          ingredients={this.state.ingredients}
          purchaseCancelled = {this.purchaseCancelHandler}
          purchaseContinued = {this.purchaseContinueHandler}
          price={this.state.totalPrice}
           />

    if(this.state.loading) {
      orderSummary = <Spinner />;
    }

    return (
      /* Order summary is wrapped in the modal and only updates when it needs to via life cycle hook*/
      <Aux>
        <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
          {orderSummary}
        </Modal>

        <Burger ingredients={this.state.ingredients} />
        <BuildControls
            ingredientAdded={this.addIngredientHandler}
            ingredientRemoved={this.removeIngredientHandler}
            disabled={disabledInfo}
            price={this.state.totalPrice}
            purchasable={this.state.purchasable}
            ordered={this.purchaseHandler}
             />
      </Aux>
    );
  }
}

export default withErrorHandler(BurgerBuilder, axios);

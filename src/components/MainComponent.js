import React, { Component } from "react";
import { Navbar, NavbarBrand } from "reactstrap";
import Menu from "./Menu";
import DishDetails from "./dishedetails";
import { DISHES } from "../shared/dishes.js";

class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dishes: DISHES,
      selectedDish: null
    };
  }

  onDishSelect(dish) {
    this.setState({ selectedDish: dish });
  }

  callComponent(dish) {
    if (dish != null) {
      return (
        <DishDetails
          selectedDish={
            this.state.dishes.filter(
              dish => dish.id === this.state.selectedDish
            )[0]
          }
        />
      );
    }
  }
  render() {
    return (
      <div>
        <Navbar dark color="primary blue">
          <div className="container">
            <NavbarBrand href="/">Famished Restaurant</NavbarBrand>
          </div>
        </Navbar>
        <Menu
          dishes={this.state.dishes}
          onClick={dishId => this.onDishSelect(dishId)}
        />
        {this.callComponent(this.state.selectedDish)}
      </div>
    );
  }
}

export default Main;

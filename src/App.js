import React, { Component } from "react";
import { Navbar, NavbarBrand } from "reactstrap";
import Menu from "./components/Menu";
import { DISHES } from "./shared/dishes.js";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dishes: DISHES
    };
  }

  render() {
    return (
      <div>
        <Navbar dark color="primary blue">
          <div className="container">
            <NavbarBrand href="/">Famished Restaurant</NavbarBrand>
          </div>
        </Navbar>
        <Menu dishes={this.state.dishes} />
      </div>
    );
  }
}

export default App;

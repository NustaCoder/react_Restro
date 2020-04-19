import React, { Component } from "react";
import {
  Card,
  CardImg,
  CardImgOverlay,
  CardText,
  CardBody,
  CardTitle
} from "reactstrap";
import DishDetails from "./dishedetails";

class Menu extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedDish: null,
      msg: "fcked"
    };
  }

  onDishSelect(dish) {
    this.setState({ selectedDish: dish });
  }

  callComponent(dish) {
    if (dish != null) {
      return <DishDetails selectedDish={this.state.selectedDish} />;
    }
  }
  render() {
    const menu = this.props.dishes.map(dish => {
      return (
        <div className="col-12 col-md-5 m-1">
          <Card key={dish.id} onClick={() => this.onDishSelect(dish)}>
            <CardImg width="100%" src={dish.image} alt={dish.name} />
            <CardImgOverlay>
              <CardTitle>{dish.name}</CardTitle>
            </CardImgOverlay>
          </Card>
        </div>
      );
    });

    return (
      <div className="container">
        <div className="row">{menu}</div>
        {this.callComponent(this.state.selectedDish)}
      </div>
    );
  }
}

export default Menu;

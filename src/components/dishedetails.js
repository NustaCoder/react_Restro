import React, { Component } from "react";
import {
  Media,
  Card,
  CardImg,
  CardImgOverlay,
  CardText,
  CardBody,
  CardTitle
} from "reactstrap";

class dishDetails extends Component {
  constructor(props) {
    super(props);

    this.state = {
      dish: this.props.selectedDish
    };
  }

  showImageAndName(dish) {
    if (dish != null)
      return (
        <Card>
          <CardImg top src={dish.image} alt={dish.name} />
          <CardBody>
            <CardTitle>{dish.name}</CardTitle>
            <CardText>{dish.description}</CardText>
          </CardBody>
        </Card>
      );
    else return <div></div>;
  }

  showComments(dish) {
    var i;
    if (dish != null) {
      return <div>{}</div>;
    } else {
      return <div></div>;
    }
  }
  render() {
    const comm = this.props.selectedDish.comments.map(dish => {
      return (
        <div>
          <h4>{dish.comment}</h4>
          <p>
            --{dish.author},{" "}
            {new Intl.DateTimeFormat("en-US", {
              year: "numeric",
              month: "short",
              day: "2-digit"
            }).format(new Date(Date.parse(dish.date)))}
          </p>
        </div>
      );
    });
    return (
      <div className="row">
        <div className="col-12 col-md-5 m-1">
          {this.showImageAndName(this.state.dish)}
        </div>
        <div className="col-12 col-md-5 m-1">
          <h3>COMMENTS</h3>
          <Media list>{comm}</Media>
        </div>
      </div>
    );
  }
}

export default dishDetails;

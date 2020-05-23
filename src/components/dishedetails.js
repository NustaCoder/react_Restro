import React, { Component } from "react";
import {
  Media,
  Card,
  CardImg,
  CardText,
  CardBody,
  CardTitle, Col, Row,
  Breadcrumb, BreadcrumbItem, Modal, ModalBody, ModalHeader, Form, FormFeedback, FormGroup, Input, Label, Button
} from "reactstrap";
import { Control, LocalForm, Errors } from "react-redux-form";
import { Link } from 'react-router-dom';
import { Loading } from "./LoadingComponent";
import { baseUrl } from '../shared/baseUrl';
import { FadeTransform, Fade, Stagger } from 'react-animation-components';

const required = (val) => val && val.length;
const maxLength = (len) => (val) => !(val) || (val.length <= len);
const minLength = (len) => (val) => !(val) || (val.length >= len);

class DishDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isModalOpen: false
    }
    this.handleSubmit = this.handleSubmit.bind(this);
    this.toggleModal = this.toggleModal.bind(this);
  }


  showImageAndName(item) {
    return (
      <FadeTransform
        in
        transformProps={{
          exitTransform: 'scale(0.5) translateY(-50%)'
        }}>
        <Card>
          <CardImg top src={baseUrl + item.image} alt={item.name} />
          <CardBody>
            <CardTitle>{item.name}</CardTitle>
            <CardText>{item.description}</CardText>
          </CardBody>
        </Card>
      </FadeTransform>
    );
  }

  toggleModal() {
    this.setState({
      isModalOpen: !this.state.isModalOpen
    });
  }
  handleSubmit(values, dishId, postComment) {
    this.toggleModal();
    postComment(dishId, values.rating, values.author, values.comment);
  }
  render() {
    const postComment = this.props.postComment;
    const comm = this.props.comments.map(dish => {
      return (
        <Stagger in>
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
        </Stagger>
      );
    });

    return (
      <div className="container">
        <div className="row">
          <Breadcrumb>

            <BreadcrumbItem><Link to="/menu">Menu</Link></BreadcrumbItem>
            <BreadcrumbItem active>{this.props.dish.name}</BreadcrumbItem>
          </Breadcrumb>
          <div className="col-12">
            <h3>{this.props.dish.name}</h3>
            <hr />
          </div>
        </div>
        <div className="row">
          <div className="col-12 col-md-5 m-1">
            {this.showImageAndName(this.props.dish)}
          </div>
          <div className="col-12 col-md-5 m-1">
            <h3>COMMENTS</h3>
            <Media list>{comm}</Media>
            <Button outline onClick={this.toggleModal} ><span className="fa fa-pencil fa-lg"></span> Submit Comment</Button>
            <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
              <ModalHeader toggle={this.toggleModal}>Submit Comment</ModalHeader>
              <ModalBody>
                <LocalForm onSubmit={(values) => this.handleSubmit(values, this.props.dish.id, postComment)}>
                  <Row className="form-group">
                    <Label htmlFor="option"><strong>Rating</strong></Label>
                    <Control.select model=".rating" name="rating"
                      className="form-control">
                      <option>1</option>
                      <option>2</option>
                      <option>3</option>
                      <option>4</option>
                      <option>5</option>

                    </Control.select>
                  </Row>
                  <Row className="form-group">
                    <Label htmlFor="author"><strong>Your Name</strong></Label>
                    <Control.text model=".author" id="author" name="author"
                      className="form-control"
                      validators={{
                        required, minLength: minLength(3), maxLength: maxLength(15)
                      }}
                    />
                    <Errors className="text-danger"
                      model=".author"
                      show="touched"
                      messages={{
                        required: "*Required",
                        minLength: " *invalid name",
                        maxLength: " *invalid name"
                      }}
                    />
                  </Row>
                  <Row className="form-group">
                    <Label htmlFor="comment" ><strong>Comment</strong></Label>
                    <Control.textarea model=".comment" id="comment" name="comment"
                      rows="6"
                      className="form-control"
                      validators={{
                        required
                      }} />
                    <Errors className="text-danger"
                      model=".comment"
                      show="touched"
                      messages={{
                        required: "*required"
                      }} />
                  </Row>
                  <Row className="form-group">
                    <Button type="submit" color="primary">
                      Submit
                                    </Button>
                  </Row>
                </LocalForm>
              </ModalBody>
            </Modal>
          </div>
        </div>
      </div >
    );
  }
}

export default DishDetails;

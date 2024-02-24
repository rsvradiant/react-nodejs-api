import React, { Component } from "react";

import UserService from "../services/user.service";
import AuthService from "../services/auth.service";

export default class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      content: "",
      redirect: null,
      currentUser: null
    };
  }

  componentDidMount() {
    
    const currentUser = AuthService.getCurrentUser();
    if(currentUser) this.setState({ currentUser: currentUser });

    UserService.getPublicContent().then(
      response => {
        this.setState({
          content: response.data
        });
      },
      error => {
        this.setState({
          content:
            (error.response && error.response.data) ||
            error.message ||
            error.toString()
        });
      }
    );
  }

  render() {
    // const { currentUser } = this.state;
    return (
      <div className="container">
        <header className="jumbotron">
          {this.state.currentUser ? <h3> Hi, {this.state.currentUser.username}</h3>:null}
          <h3>{this.state.content}</h3>
        </header>
      </div>
    );
  }
}

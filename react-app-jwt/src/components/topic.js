import React, { Component } from "react";

import AuthService from "../services/auth.service";
import TopicService from "../services/topic.service";
import EventBus from "../common/EventBus";
import { DNA } from "react-loader-spinner";

export default class Topic extends Component {
  constructor(props) {
    super(props);

    this.state = {
      redirect: null,
      isLoading: false,
      userReady: false,
      topics: [],
      currentUser: { username: "" }
    };
  }

  componentDidMount() {
    const currentUser = AuthService.getCurrentUser();

    if (!currentUser) this.setState({ redirect: "/home" });
    this.setState({ currentUser: currentUser, userReady: true })

    TopicService.getTopicsData().then(
      response => {
        this.setState({
          topics: response.data,
          isLoading:true
        });
      },
      error => {
        this.setState({
          content:
            (error.response && error.response.data) ||
            error.message ||
            error.toString()
        });
        EventBus.dispatch("logout");
      }
    );
    
  }

  render() {    
    const { isLoading } = this.state.isLoading;
    const TopicRow = (topic,index) => {
      return(
            <tr key = {index} className={index%2 === 0?'odd':'even'}>
                <td>{topic.Id}</td>
                <td>{topic.Type}</td>
                <td>{topic.Title}</td>
                <td>{topic.ParentId}</td>
            </tr>
          )
    }

    const topicTable =this.state.topics.map((topic,index) => TopicRow(topic,index))

    return (      
      <div className="container">
        {isLoading && <div>        
        <DNA
          visible={isLoading}
          height="80"
          width="80"
          ariaLabel="dna-loading"
          wrapperStyle={{}}
          wrapperClass="dna-wrapper"
          />
          </div>     
        }
        {!isLoading &&
        <table className="table table-bordered">
            <thead>
            <tr>
                <th>Topic Id</th>
                <th>Type</th>
                <th>Title</th>
                <th>ParentId</th>
            </tr>
            </thead>
            <tbody>
                {topicTable}
            </tbody>
        </table>}
    </div>
    );
  }
}

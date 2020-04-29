import React, { Component } from 'react';
import './home.css';

class Home extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {

  }

  onClick() {
    alert("Move to form!");
  }

  render() {
    let title = this.props.title || "Home";
    return (
      <div className={this.props.className}>
        <h3>{title}</h3>
        <div className="">
          <button onClick={() => this.onClick()}>
            Go to form
          </button>
        </div>
      </div>
    );
  }
}

export default Home;
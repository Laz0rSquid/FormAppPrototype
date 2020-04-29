import React, { Component } from 'react';
import './login.css';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      test: {
        nurseID: "nurseID",
        password: "pw123456",
        pseudonym: "pseudonym",
      },
      input: {},
      texts: {
        nurseID: "NurseID",
        password: "Password",
        pseudonym: "Pseudonym",
      },
    }
  }

  onChange = (e) => {

  }

  onSubmit = (e) => {
    e.preventDefault();
    alert("Test");
  }

  renderInput = (key) => {

  }

  renderForm = () => {
    let model = [
      { key: "", label: "", propr: { required: true } },
      { key: "", label: "", propr: { required: true } },
      { key: "", label: "", propr: { required: true } },
    ];
    let loginUI = model.map((m) => {
      
    });
    return formUI;
  }

  render() {
    let title = this.props.title || "Login";
    return (
      <div className={this.props.className}>
        <h3>{title}</h3>
        <form className="" onSubmit={(e) => { this.onSubmit(e) }} >
          {this.renderForm()}
          <div className="">
            <button type="submit">submit</button>
          </div>
        </form>
      </div>
    );
  }

}

export default Login;
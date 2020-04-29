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
      model : [
        { key: "nurseID", label: "NurseID", propr: { required: true } },
        { key: "password", label: "Password", propr: { required: true } },
        { key: "pseudonym", label: "Pseudonym", propr: { required: true } },
      ]
    }
  }

  onChange = (e,key) => {
    this.setState((state) => {
      let newInputs = this.state.inputs ||{};
      newInputs[key] = this[key].value;
      return { inputs: {...newInputs}};
    });
  }

  onSubmit = (e) => {
    e.preventDefault();
    alert("Move to form");
  }

  renderInput = (m, key) => {
    let type = m.type || "text";
    let props = m.props || {};
    let name = m.name;
    let value = m.value;
    return (
      <input
        {...props}
        ref={(key) => { this[m.key] = key }}
        type={type}
        key={"input" + m.key}
        onChange={e => {
          this.onChange(e, key);
        }}
      />
    )
  }

  renderForm = () => {
    let model = this.state.model;
    let loginUI = model.map((m) => {
      let key = m.key;
      return (
        <div key={key} className="">
          <label className="" key={"label" + m.key} htmlFor={m.key}>
            {m.label}
          </label>
          {this.renderInput(m, key)}
        </div>
      );

    });
    return loginUI;
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
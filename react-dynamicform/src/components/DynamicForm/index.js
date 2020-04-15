import React, { Component } from 'react';
//import ReactDOM from 'react-dom';
import './form.css';

export default class DynamicForm extends Component {
  state = {}

  onChange = (e, key) => {
    this.setState({
      [key]: this[key].value
    });
  }

  onSubmit = (e) => {
    e.preventDefault();
    if (this.props.onSubmit) this.props.onSubmit(this.state);
  }

  /*
  helperCheckInputType = (type) => {
    return type;
  }
  */

  renderInput = (m, key, type) => {
    return (
      <input {...m.props}
        ref={(key) => { this[m.key] = key }}
        className="form-input"
        type={type}
        key={"input" + key}
        onChange={(e) => { this.onChange(e, key) }} />
    );
  }

  renderForm = () => {
    let model = this.props.model;

    let formUI = model.map((m) => {
      let key = m.key;
      let type = m.type;
      let props = m.props || {};

      return (
        <div key={key} className="form-group">
          <label className="form-label" key={"label" + m.key} htmlFor={m.key}>
            {m.label}
          </label>
          {type && this.renderInput(m, key, type)}
        </div>
      );
    });
    return formUI;
  }

  render() {
    let title = this.props.title || "Dynamic Form";

    return (
      <div className={this.props.className}>
        <h3>{title}</h3>
        <form className="dynamic-form" onSubmit={(e) => { this.onSubmit(e) }} >
          {this.renderForm()}
          <div className="form-group">
            <button type="submit">submit</button>
          </div>
        </form>
      </div>
    );
  }
}
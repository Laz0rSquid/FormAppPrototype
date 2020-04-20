import React, { Component } from 'react';
import './form.css';

export default class DynamicForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      consents: []
    };
  }

  getConsentStatusByKey = (key) => {
    return { "status": this[key].checked ? "ACCEPTED" : "DECLINED" };
  }

  onChange = (e, key) => {
    this.setState({
      consents : {[key] : this.getConsentStatusByKey(key)}
    });
  }

  onSubmit = (e) => {
    e.preventDefault();
    if (this.props.onSubmit) this.props.onSubmit(this.state.consents);
  }

  renderInput = (m, key) => {
    return (
      <input {...m.props}
        ref={(key) => { this[m.key] = key }}
        name="consent"
        className="form-input"
        type="checkbox"
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
            {m.title}
          </label>
          <text>
            {m.text}
          </text>
          {this.renderInput(m, key)}
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
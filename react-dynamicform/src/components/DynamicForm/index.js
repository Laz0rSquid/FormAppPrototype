import React, { Component } from 'react';
import './form.css';

export default class DynamicForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      consents: {}
    };
  }

  getConsentStatusByKey = (key) => {
    return this[key].checked ? "ACCEPTED" : "DECLINED";
  }

  getConsentObject = (key) => {
    return { id: key, status: this.getConsentStatusByKey(key) };
  }

  addOrReplaceConsent = (consents, key) => {
    return consents[key] = this.getConsentObject(key);
  }

  onChange = (e, key) => {
    this.setState((state) => {
      let newConsents = state.consents || {};
      this.addOrReplaceConsent(newConsents, key);
      return {consents: {...newConsents}};
    });
  }

  // checkValueOnSubmitHelper = (item) => {
  //   let exists = true;
  //   exists = Object.keys(this.state.consents).map((key) => {
  //     return key === item.id ? !exists : exists;
  //   });
  // }

  /**
   * TODO:
   * The submit function now sends the consent data in the desired way as long as every box has been
   * checked at least once.is works as long as every available option has been checked once. This is
   * still not the desired functionality, there needs to be a way to store the default value for
   * consent on first render, so that these are used on submission.
   * Solutions to explore:
   * - Change input elements to store their default prop as an initial value
   * - Initialize state.consents with the default data on first render (probably need to look at 
   *   constructor)
   */
  onSubmit = (e) => {
    e.preventDefault();
    let consentsArray = [];
    Object.keys(this.state.consents).forEach((key) => {
      consentsArray.push(this.state.consents[key]);
    });
    // this.props.model.forEach((item) => {
    //   if (this.checkValueOnSubmitHelper(item)) consentsArray.push(this.props.model[item])
    // });
    if (this.props.onSubmit) this.props.onSubmit(consentsArray);
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
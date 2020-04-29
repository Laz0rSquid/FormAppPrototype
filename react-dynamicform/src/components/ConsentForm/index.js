import React, { Component } from 'react';
import './form.css';

class ConsentForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      consents: {}
    };
  }

  componentDidMount = () => {
    this.setState((state) => {
      let model = this.props.model || {};
      let defaultConsents = {};
      Object.keys(model).map((i) => {
        return this.addOrReplaceConsent(defaultConsents, model[i].key, model[i].default);
      });
      return state.consents = defaultConsents;
    });
  }

  addOrReplaceConsent = (consents, key, value) => {
    return consents[key] = { id: key, status: value ? "ACCEPTED" : "DECLINED" };
  }

  onChange = (e, key) => {
    this.setState((state) => {
      let newConsents = state.consents || {};
      this.addOrReplaceConsent(newConsents, key, this[key].checked);
      return {consents: {...newConsents}};
    });
  }

  onSubmit = (e) => {
    e.preventDefault();
    let consentsArray = [];
    Object.keys(this.state.consents).forEach((key) => {
      consentsArray.push(this.state.consents[key]);
    });
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
    let title = this.props.title || "Consent Form";

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

export default ConsentForm;
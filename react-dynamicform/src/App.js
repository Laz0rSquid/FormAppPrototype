import React, { Component } from 'react';
import ConsentForm from './components/ConsentForm';
import './App.css';

class App extends Component {
  state = {
    data: [
      {
        key: "masterData",
        title:"Stammdaten",
        text:"Dürfen wir Ihre Stammdaten erfassen?",
        props: {
          default: false
        }
      },
      {
        key: "clinicalData",
        title:"Klinische Daten",
        text:"Dürfen wir Ihre klinischen Daten erfassen?",
        props: {
          default: false
        }
      },
      {
        key: "bioSamples",
        title:"Bioproben",
        text:"Dürfen wir Bioproben entnehmen?",
        props: {
          default: false
        }
      }
    ],
    patients: [
      {
        id: "123",
        pseudonym: "Jane Doe",
        consents: [
          {id: "masterData", status: "ACCEPTED"},
          {id: "clinicalData", status: "ACCEPTED"},
          {id: "bioSamples", status: "ACCEPTED"}
        ]
      }
    ]
  }

  onSubmit = (model) => {
    let newPatient = {};
    newPatient.id = +new Date();
    newPatient.pseudonym = "Jim Doe";
    newPatient.consents = model;
    this.setState({
      patients: [newPatient, ...this.state.patients]
    });
  }
  
  /**
   * TODO:
   * - DONE: Model needs to be taken from this.state.data (in preparation for loading it from files)
   * - Model currently changes its identity in DynamicForm, maybe I can store the data from
   *   the form in model.props to avoid confusion and data errors in the future
   * - DONE: Test if form still works with expanded model, else form needs to be reworked to 
   *   accomodate the changes
   */
  render() {
    return (
      <div className="App">
        <ConsentForm className="form"
          title="Consent"
          model={this.state.data}
          onSubmit={(model) => {this.onSubmit(model)}}
        />

        <pre style={{width:"300px"}}>
          {JSON.stringify(this.state.patients)}
        </pre>

      </div>
    );
  }
}

export default App;

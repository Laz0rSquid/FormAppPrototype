import React, { Component } from 'react';
import DynamicForm from './components/DynamicForm';
import './App.css';

class App extends Component {
  state = {
    data: [
      {
        key: "masterData",
        title:"Stammdaten",
        text:"Dürfen wir Ihre Stammdaten erfassen?",
        props: [
          {default: false}
        ]
      },
      {
        key: "clinicalData",
        title:"Klinische Daten",
        text:"Dürfen wir Ihre klinischen Daten erfassen?",
        props: [
          {default: false}
        ]
      },
      {
        key: "bioSamples",
        title:"Bioproben",
        text:"Dürfen wir Bioproben entnehmen?",
        props: [
          {default: false}
        ]
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

  // Needs to be renamed later down the line (not getting models anymore)
  getModel = () => {
    let model = this.state.data;
  }

  savePatientConsentHelper = (model) => {
    let newPatient = {};
    newPatient.id = +new Date();
    newPatient.pseudonym = "Jim Doe";
    newPatient.consents = [model];
    this.setState({
      patients: [newPatient, ...this.state.patients]
    });
  }

  onSubmit = (model) => {
    this.savePatientConsentHelper(model);
    /*model.id = +new Date();
    this.setState({
      patients: [model, ...this.state.patients]
    });*/
  }
  
  render() {
    return (
      <div className="App">
        <DynamicForm className="form"
          title="Consent"
          model={[
            {
              key: "persoanlData",
              title: "Personal Data",
              text: "I give my consent for my personal data to be used in this study",
              props: {
                default: false
              }
            }
          ]}
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

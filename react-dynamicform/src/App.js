import React, { Component } from 'react';
import ConsentForm from './components/ConsentForm';
import Home from './components/Home';
import Login from './components/Login';
import './App.css';

class App extends Component {
  state = {
    data: [
      {
        key: "masterData",
        title: "Stammdaten",
        text: "Dürfen wir Ihre Stammdaten erfassen?",
        props: {
          default: false
        }
      },
      {
        key: "clinicalData",
        title: "Klinische Daten",
        text: "Dürfen wir Ihre klinischen Daten erfassen?",
        props: {
          default: false
        }
      },
      {
        key: "bioSamples",
        title: "Bioproben",
        text: "Dürfen wir Bioproben entnehmen?",
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
          { id: "masterData", status: "ACCEPTED" },
          { id: "clinicalData", status: "ACCEPTED" },
          { id: "bioSamples", status: "ACCEPTED" }
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
   * Currently all screens are rendered below each other for testing purposes.
   * Next step is a navigation stack that allows individual rendering
   */
  render() {
    return (
      <div className="App">
        <Home className="form"
          
        />

        <Login className="form"
          
        />

        <ConsentForm className="form"
          title="Consent"
          model={this.state.data}
          onSubmit={(model) => { this.onSubmit(model) }}
        />

        <pre style={{ width: "300px" }}>
          {JSON.stringify(this.state.patients)}
        </pre>

      </div>
    );
  }
}

export default App;

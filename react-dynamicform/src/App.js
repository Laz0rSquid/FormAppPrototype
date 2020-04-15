import React, { Component } from 'react';
import DynamicForm from './components/DynamicForm';
import './App.css';

class App extends Component {
  state = {
    data: [
      {id: "masterData", title:"Stammdaten", text:"Dürfen wir Ihre Stammdaten erfassen?", default: false},
      {id: "clinicalData", title:"Klinische Daten", text:"Dürfen wir Ihre klinischen Daten erfassen?", default: false},
      {id: "bioSamples", title:"Bioproben", text:"Dürfen wir Bioproben entnehmen?", default: false}
    ],
    patients: [
      {
        id: "123",
        pseudonym: "Jane Doe",
        consents: [
          {id: "masterData", status: true},
          {id: "clinicalData", status: true},
          {id: "bioSamples", status: true}
        ]
      }
    ]
  }

  onSubmit = (model) => {
    model.id = +new Date();
    alert(JSON.stringify(model));
    this.setState({
      data: [model, ...this.state.data]
    });
  }
  
  render() {
    return (
      <div className="App">
        <DynamicForm className="form"
          title="Consent"
          model={[
            {key: "name", label: "Title"},
            {key: "info", label: "Info"},
            {key: "consent", label: "Yes/No?", type:"text", props: {required: true}}
          ]}
          onSubmit={(model) => {this.onSubmit(model)}}
        />

        <pre style={{width:"300px"}}>
          {JSON.stringify(this.state.data)}
        </pre>

      </div>
    );
  }
}

export default App;

import React, { Component } from 'react';
import DynamicForm from './components/DynamicForm';
import './App.css';

class App extends Component {
  state = {
    data: [
      {id: 0, title:"a", info:"info about a", consent:"Yes/No?"},
      {id: 1, title:"b", info:"info about b", consent:"Yes/No?"},
      {id: 2, title:"c", info:"info about c", consent:"Yes/No?"}
    ]
  }

  render() {
    return (
      <div className="App">
        <DynamicForm 
          className="form"
          title="Consent"
          model={[
            {key: "title", label: "Title"},
            {key: "info", label: "Info"},
            {key: "consent", label: "Yes/No?", props: {required: true}}
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

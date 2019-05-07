import React, { Component } from "react";
import { Provider } from "react-redux";
import store from "./store";
import "./App.css";
import Calendar from "../src/containers/calendarContainer/calendar";
import FilterDate from "../src/components/filterDate/filterDate";

class App extends Component {
  public render() {
    return (
      <Provider store={store}>
        <div className="App">
          <header className="App-header">
            <h1>My Calendar</h1>
          </header>
          <main>
            <Calendar />
          </main>
        </div>
      </Provider>
    );
  }
}

export default App;

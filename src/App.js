import React, { Component } from "react";
import MemeGenerator from "./Components/Generator";
import Header from "./Components/header";
import "./App.css";

export default class App extends Component {
  render() {
    return (
      <div>
        <Header />
        <MemeGenerator />
      </div>
    );
  }
}

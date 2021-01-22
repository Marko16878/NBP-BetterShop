import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import ErrorBoundary from "./ErrorBoundary";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Login from "./Login"

ReactDOM.render(
  <ErrorBoundary>
    
    <Router>
      
      <App />
      
    </Router>
    
  </ErrorBoundary>,

  document.getElementById("root")
);

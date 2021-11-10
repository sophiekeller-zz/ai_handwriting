import logo from "./logo.svg";
import "./App.css";
import NavBar from "./NavBar.js";
import Uploader from "./Uploader.js";
import "bootstrap/dist/css/bootstrap.min.css";
import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

function App() {
  const [results, setResults] = useState(null);

  return (
    <div className="main-container">
      <Router>
        <NavBar />
        <Routes>
          <Route
            exact
            path="/"
            element={<Uploader setResults={setResults} />}
          ></Route>
          <Route exact path="/about"></Route>
          <Route exact path="/results"></Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;

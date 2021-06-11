import React, { useState } from "react";
import "./App.css";
import Searchbar from "./Components/SearchBar";
import Results from "./Components/Results";
import Loader from "react-loader-spinner";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";

function App() {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  return (
    <div className="App">
      <div className="heading">
        <h1>MiddleGround</h1>
      </div>
      <div className="Form">
        <Searchbar setResults={setResults} setLoading={setLoading} />
      </div>
      {loading ? (
        <Loader
          type="Plane"
          style={{ textAlign: "center", marginTop: "50" }}
          color="#ad343e"
          height={150}
          width={150}
        />
      ) : (
        <Results results={results} />
      )}
    </div>
  );
}

export default App;

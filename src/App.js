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
      <Searchbar setResults={setResults} setLoading={setLoading} />
      {loading ? (
        <div className="loader">
          <Loader
            type="Oval"
            style={{ textAlign: "center", marginTop: "50" }}
            color="black"
            height={100}
            width={100}
          />
        </div>
      ) : (
        <Results results={results} />
      )}
    </div>
  );
}

export default App;

import React from "react";
import Result from "./Result";

function Results({ results }) {
  return (
    <div className="search">
      {!results.length ? (
        <h2>No results found!</h2>
      ) : (
        results.map(function (result, index) {
          return (
            <Result
              title={result.title}
              author={result.author}
              source={result.source.name}
              url={result.url}
              image={result.urlToImage}
              publishedAt={`${result.publishedAt}`}
              id={result.publishedAt}
              key={`${result.publishedAt} ${index}`}
            />
          );
        })
      )}
    </div>
  );
}

export default Results;
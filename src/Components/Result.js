import React from "react";
import Placeholder from "./../resources/placeholder.png";

const Result = (props) => {
  // eslint-disable-next-line
  const { title, source, url, image, publishedAt } = props;
  let hero = image || Placeholder;

  var [date, time] = publishedAt.split("T");
  time = time.slice(0, -1);
  return (
    <div className="result">
      <a href={url} target="_blank" rel="noreferrer">
        <div className="image-container">
          <img src={hero} alt={title} />
        </div>
      </a>
      <div className="info">
        <a href={url} target="_blank" rel="noreferrer">
          <h2>{title}</h2>
        </a>
        <div className="source-date-container">
          <div className="source">Source: {source}</div>
          <div className="date">Published at: {`${time}, ${date}`}</div>
        </div>
      </div>
    </div>
  );
};

export default Result;

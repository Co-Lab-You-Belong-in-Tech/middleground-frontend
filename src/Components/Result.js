import React from "react";
import Placeholder from "./../resources/placeholder.png";
import Center from "./../resources/center_mini.png";
import LeftLeaning from "./../resources/left_mini.png";
import RightLeaning from "./../resources/right_mini.png";

const Result = (props) => {
  // eslint-disable-next-line
  const { title, source, url, image, publishedAt, bias } = props;
  var biasImage;
  if (bias === "center") {
    biasImage = Center;
  } else if (bias === "left leaning") {
    biasImage = LeftLeaning;
  } else if (bias === "right leaning") {
    biasImage = RightLeaning;
  } else {
    biasImage = undefined;
  }
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
        {biasImage && <img src={biasImage} alt="bias depector" />}
      </div>
    </div>
  );
};

export default Result;

import React from "react";

const Result = (props) => {
  const { title, author, source, url, image, publishedAt } = props;
  let hero = image || `http://pets-images.dev-apis.com/pets/none.jpg`;

  var [date, time] = publishedAt.split("T");
  time = time.slice(0, -1);
  return (
    <a href={url} target="_blank" rel="noreferrer" className="result">
      <div className="image-container">
        <img src={hero} alt={title} />
      </div>
      <div className="info">
        <h1>{title}</h1>
        <h2>
          author(s): <strong>{author}</strong>
        </h2>
        {/* <h2>{`author(s): ${author}`}</h2> */}
        <h2>
          source: <strong>{source}</strong>
        </h2>
        {/* <h2>{`source: ${source}`}</h2>
        <h2>{`source: ${source}`}</h2> */}
        <p>{`${date} | ${time}`}</p>
      </div>
    </a>
  );
};

export default Result;

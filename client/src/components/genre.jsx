import React from 'react';

const Genre = (props) => (
  <div className="info-box__genre">
    <span className="hashTag"># </span>
    <span className="info-box__genre-text">{props.genre}</span>
  </div>
);

export default Genre;

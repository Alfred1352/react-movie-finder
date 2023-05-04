import React from 'react';

const Movie = ({ movie }) => {
  const { Title, Poster, Year, Genre, imdbRating, imdbVotes, Production } = movie;

  return (
    <div className='image-container d-flex justify-content-start m-3'>
      <img src={Poster} alt='movie' />
      <div className='movie-info'>
        <h3>{Title}</h3>
        <h5>{Year}</h5>
        <p>{Genre}</p>
        <p>Ratings: {imdbRating}/10 ({imdbVotes} votes)</p>
        <p>Streaming: {Production}</p>
      </div>
    </div>
  );
};

export default Movie;

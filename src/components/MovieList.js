import React from 'react';
import Movie from './Movie';

const MovieList = ({ movies, handleFavoritesClick, favoriteComponent }) => {
  const FavoriteComponent = favoriteComponent;
  return (
    <>
      {movies.map((movie, index) => (
        <div key={index}>
          <Movie movie={movie} />
          <div
            onClick={() => handleFavoritesClick(movie)}
            className='overlay d-flex align-items-center justify-content-center'
          >
            <FavoriteComponent />
          </div>
        </div>
      ))}
    </>
  );
};

export default MovieList;

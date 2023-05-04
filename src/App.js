import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import './App.css';
import MovieList from './components/MovieList';
import MovieListHeading from './components/MovieListHeading';
import Search from './components/Search';
import AddFavorites from './components/AddFavorites';
import MovieCard from './components/MovieCard';

function App() {
  const [movies, setMovies] = useState([]);
  const [searchValue, setSearchValue] = useState('');
  const [favorites, setFavorites] = useState([]);

  const getMovieRequest = async (searchValue) => {
    const url = `http://www.omdbapi.com/?s=${searchValue}&apikey=1cdea750`;

    const response = await fetch(url);
    const { Search: movieList } = await response.json();

    if (movieList) {
      const requests = movieList.map((movie) => {
        return fetch(`http://www.omdbapi.com/?i=${movie.imdbID}&apikey=1cdea750`).then(response =>
          response.json(),
        );
      });

      Promise.all(requests).then((results) => {
        const updatedMovies = results.map((movie, index) => ({
          ...movieList[index],
          ...movie,
        }));
        setMovies(updatedMovies);
      });
    }
  };

  useEffect(() => {
    getMovieRequest(searchValue);
  }, [searchValue]);

  const addFavoriteMovie = (movie) => {
    const newFavoriteList = [...favorites, movie];
    setFavorites(newFavoriteList);
  };

  return (
    <div className="container-fluid movie-app">
      <div className="row d-flex align-items-center mt-4 mb-4">
        <MovieListHeading heading="Movies" />
        <Search searchValue={searchValue} setSearchValue={setSearchValue} />
      </div>
      <div className="row">
        <MovieList
          movies={movies}
          handleFavoritesClick={addFavoriteMovie}
          favoriteComponent={AddFavorites}
        >
          {movies.map((movie, index) => (
            <div key={index} className="col-sm-6 col-md-4 col-lg-3">
              <MovieCard movie={movie} />
            </div>
          ))}
        </MovieList>
      </div>
      <div className="row d-flex align-items-center mt-4 mb-4">
        <MovieListHeading heading="Favorite Movies" />
      </div>
      <div className="row">
        <MovieList
          movies={favorites}
          handleFavoritesClick={addFavoriteMovie}
          favoriteComponent={AddFavorites}
        />
      </div>
    </div>
  );
}

export default App;

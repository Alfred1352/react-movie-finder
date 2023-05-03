import React from 'react';
import { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import './App.css';
import MovieList from './components/MovieList';
import MovieListHeading from './components/MovieListHeading';
import Search from './components/Search';
import AddFavorites from './components/AddFavorites';

function App() {

  const [movies, setMovies] = useState([]);
  const [searchValue, setSearchValue] = useState('');
  const [favorites, setFavorites] = useState([]);

  const getMovieRequest = async (searchValue) => {
    const url = `http://www.omdbapi.com/?s=${searchValue}&apikey=1cdea750`

    const response = await fetch(url);
    const responseJSON = await response.json();

    if (responseJSON.Search) {
      setMovies(responseJSON.Search);
    }

  }

  useEffect(() => {
    getMovieRequest(searchValue);
  }, [searchValue])

  const addFavoriteMovie = (movie) => {
    const newFavoriteList = [...favorites, movie];
    setFavorites(newFavoriteList);
  }




  return (
    <div className="container-fluid movie-app">
      <div className='row d-flex align-items-center mt-4 mb-4'>
        <MovieListHeading heading='Movies'/>
        <Search searchValue={searchValue} setSearchValue={setSearchValue}/>
      </div>
      <div className="row"> 
        <MovieList movies={movies} handleFavoritesClick={addFavoriteMovie} favoriteComponent={AddFavorites}/>
      </div>
      <div className='row d-flex align-items-center mt-4 mb-4'>
        <MovieListHeading heading='Favorite Movie'/>
      </div>
      <div className='row'> 
        <MovieList movies={favorites} handleFavoritesClick={addFavoriteMovie} favoriteComponent={AddFavorites}/>
      </div>

    </div>
  );
}

export default App;

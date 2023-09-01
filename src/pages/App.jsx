import { useEffect, useState } from "react";

import logo from "../assets/devflix2.png";
import searchIcon from "../assets/Vector.svg";


import "./App.css";
import MovieCard from "../components/MovieCard/movieCard";
import Footer from "../components/footer/footer";
import Moviecards from "../components/moviecards/moviecards";

const App = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [movies, setMovies] = useState([]);

  const apiKey = "4987db59";
  const apiUrl = `https://omdbapi.com/?apikey=${apiKey}`;

  useEffect(() => {
    searchMovies("Batman");
  }, []);

  const searchMovies = async (title) => {
    const response = await fetch(`${apiUrl}&s=${title}`);
    const data = await response.json();

    console.log(data.Search);
    setMovies(data.Search);
  };

  const handlekeyPress = (e) => {
    e.key === "Enter" && searchMovies(searchTerm);
  };

  // JEITO MAIS COMPLEXO DE FAZER A API

  // fetch(apiUrl)
  // .then((response) => response.json())
  // .then((data) => console.log(data));

  return (
    <div id="app">
      <div id="my-image">
        <img src="src/assets/dev.png"></img>
      </div>
      <div className="logo">
        <img src={logo} alt="logo devflix" />
      </div>
      <div className="trending">
        <a>
          Trending Now
          <img className="fire" src="src/assets/mdi_fire.svg" alt="" />
          
        </a>
        <div className="search">
          <input
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyDown={handlekeyPress}
            placeholder="Search Movies..."
          />
          <img
            src={searchIcon}
            alt="Icone de pesquisa"
            onClick={() => searchMovies(searchTerm)}
          />
        </div>
      </div>
      {movies?.length > 0 ? (
        <div className="container">
          <section className="sectio">
            {movies.map((movie) => (
              <Moviecards key={movie.imdbID} movies={movie} />
            ))}
          </section>
        </div>
      ) : (
        <div className="empty">
          <h2>Nenhum filme encontrado 😢</h2>
        </div>
      )}
      <div className="recomendado">
        <p>
          <a>
            Recomended
            <img className="play" src="src/assets/streamline_entertainment-control-button-play-button-television-buttons-movies-play-tv-video-controls.svg" alt="" />
            
          </a>
        </p>
      </div>
      {movies?.length > 0 ? (
        <div className="container">
          {movies.map((movie) => (
            <MovieCard key={movie.imdbID} movies={movie} />
          ))}
        </div>
      ) : (
        <div className="empty">
          <h2></h2>
        </div>
      )}

      <Footer link={"https://github.com/B4g4rini"}>B4g4rini</Footer>
    </div>
  );
};

export default App;

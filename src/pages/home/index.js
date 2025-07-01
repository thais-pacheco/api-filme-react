import React, { useEffect, useState } from "react";
import { Container, Movie, MovieList, Btn } from "./style";
import { Link } from "react-router-dom";

function Home() {
  const imagePath = "https://image.tmdb.org/t/p/w500";
  const [movies, setMovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const KEY = process.env.REACT_APP_KEY;

  console.log("Chave API:", KEY);

  useEffect(() => {
    let url;
    if (searchTerm.trim() === "") {
      url = `https://api.themoviedb.org/3/movie/popular?api_key=${KEY}&language=pt-BR`;
    } else {
      url = `https://api.themoviedb.org/3/search/movie?api_key=${KEY}&language=pt-BR&query=${encodeURIComponent(searchTerm)}`;
    }
    console.log("URL requisitada:", url);

    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        console.log("Dados recebidos:", data);
        setMovies(data.results);
      })
      .catch((error) => console.error("Erro no fetch:", error));
  }, [KEY, searchTerm]);

  return (
    <Container>
      <h1>Filmes</h1>

      <input
        type="text"
        placeholder="Digite para buscar..."
        value={searchTerm}
        onChange={(e) => {
          console.log("Buscando:", e.target.value);
          setSearchTerm(e.target.value);
        }}
        style={{ padding: "8px", width: "100%", marginBottom: "20px" }}
      />

      <MovieList>
        {movies.map((movie) => (
          <Movie key={movie.id}>
            <img
              src={movie.poster_path ? `${imagePath}${movie.poster_path}` : "/fallback.png"}
              alt={movie.title}
            />
            <span>{movie.title}</span>

            <Link to={`/${movie.id}`}>
              <Btn>Detalhes</Btn>
            </Link>
          </Movie>
        ))}
      </MovieList>
    </Container>
  );
}

export default Home;

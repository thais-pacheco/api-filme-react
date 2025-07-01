const API_KEY = 'e8b986db6bf3464852953752b679b727';
const BASE_URL = 'https://api.themoviedb.org/3';

export async function fetchPopularMovies() {
  const res = await fetch(`${BASE_URL}/movie/popular?api_key=${API_KEY}&language=pt-BR&page=1`);
  const data = await res.json();
  return data.results;
}

export async function fetchMovieById(id) {
  const res = await fetch(`${BASE_URL}/movie/${id}?api_key=${API_KEY}&language=pt-BR`);
  const data = await res.json();
  return data;
}

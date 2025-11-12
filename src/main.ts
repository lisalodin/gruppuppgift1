import "./style.css";
const BASE_URL = "https://www.omdbapi.com/?apikey=9eae2121&s=harry;";

const get = async <T>(URL: string) => {
  const response = await fetch(URL);
  const data: T = await response.json();
  return data;
};

const app = document.getElementById("app") as HTMLElement;

const form = document.createElement("form");
form.id = "searchForm";

const input = document.createElement("input");
input.type = "text";
input.id = "searchText";

const button = document.createElement("button");
button.textContent = "Sök";

form.appendChild(input);
form.appendChild(button);

const movies = document.createElement("section");
movies.id = "movies";

app.appendChild(form);
app.appendChild(movies);

export type OmdbResponse = {
  Search: Movie[];
};

export type Movie = {
  Title: string;
  Poster: string;
  imdbID: string;
};
export const getMovies = async (searchText: string) => {
  const response = await get<OmdbResponse>(`${BASE_URL}s=${searchText}`);
  return response.Search;
};

export const getMovieById = async (id: string) => {
  return await get<Movie>(`${BASE_URL}i=${id}`);
};

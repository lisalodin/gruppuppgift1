import "./style.css";
const BASE_URL = "https://www.omdbapi.com/?apikey=9eae2121&";

const get = async <T>(URL: string) => {
  const response = await fetch(URL);
  const data: T = await response.json();
  return data;
};

export const createHtml = (movies: Movie[]) => {
  const moviesSection = document.getElementById("movies");

  if (moviesSection) {
    moviesSection.innerHTML = "";
  }

  movies.forEach((movie) => {
    const movieContainer = document.createElement("div");
    const imgContainer = document.createElement("div");
    const img = document.createElement("img");
    const title = document.createElement("h2");
    img.src = movie.Poster;
    title.innerHTML = movie.Title;

    movieContainer.addEventListener("click", async () => {
      const movieDetails = await getMovieById(movie.imdbID);
    });

    imgContainer.appendChild(img);
    movieContainer.appendChild(title);
    movieContainer.appendChild(imgContainer);
    moviesSection?.appendChild(movieContainer);
  });
};

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

const app = document.getElementById("app") as HTMLElement;

const input = document.createElement("input");
input.type = "text";
input.id = "searchText";

const button = document.createElement("button");
button.textContent = "Sök";

const form = document.createElement("form");
form.id = "searchForm";
// form.addEventListener("submit", async (e) => {
//   e.preventDefault();

//   const movies = await getMovies(input.value);
//   createHtml(movies);
// });

form.appendChild(input);
form.appendChild(button);

const movies = document.createElement("section");
movies.id = "movies";

app.appendChild(form);
app.appendChild(movies);

document.getElementById("searchForm")?.addEventListener("submit", async (e) => {
  e.preventDefault();

  const theInput = document.getElementById("searchText");

  let searchText = "";
  if (theInput) {
    searchText = (theInput as HTMLInputElement).value;
  }

  const movies = await getMovies(searchText);
  createHtml(movies);

  if (theInput) {
    (theInput as HTMLInputElement).value = "";
  }
});

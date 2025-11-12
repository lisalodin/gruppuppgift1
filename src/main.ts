import "./style.css";
const BASE_URL = "https://www.omdbapi.com/?apikey=9eae2121&s=harry;";

export const getMovies = async (searchText: string) => {
  const response = await get<OmdbResponse>(`${BASE_URL}s=${searchText}`);
  return response.Search;
};

export const getMovieById = async (id: string) => {
  return await get<Movie>(`${BASE_URL}i=${id}`);
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

document.querySelector<HTMLDivElement>("#app")!.innerHTML = `
  <div>
    <a href="https://vite.dev" target="_blank">
      <img src="${viteLogo}" class="logo" alt="Vite logo" />
    </a>
    <a href="https://www.typescriptlang.org/" target="_blank">
      <img src="${typescriptLogo}" class="logo vanilla" alt="TypeScript logo" />
    </a>
    <h1>Vite + TypeScript</h1>
    <div class="card">
      <button id="counter" type="button"></button>
    </div>
    <p class="read-the-docs">
      Click on the Vite and TypeScript logos to learn more
    </p>
  </div>
`;
export type OmdbResponse = {
  Search: Movie[];
};

export type Movie = {
  Title: string;
  Poster: string;
  imdbID: string;
};

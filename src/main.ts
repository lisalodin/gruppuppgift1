import "./style.css";
const BASE_URL = "https://www.omdbapi.com/?apikey=9eae2121&s=harry;";

export const getMovies = async (searchText: string) => {
  const response = await get<OmdbResponse>(`${BASE_URL}s=${searchText}`);
  return response.Search;
};

export const getMovieById = async (id: string) => {
  return await get<Movie>(`${BASE_URL}i=${id}`);
};

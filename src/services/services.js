const apiKey = "api_key=626eebde47750fb57144ba7fcfb85a26";
const mainUrl = "https://api.themoviedb.org/3";
const searchUrl = `${mainUrl}/search/multi?${apiKey}&language=en-US&query=`;
const playingNowUrl = `${mainUrl}/movie/now_playing?${apiKey}&language=en-US&page=1`;
const videosUrl = `${mainUrl}/movie/`;
const youtubeUrl = "https://www.youtube.com/watch?v=";
const genresUrl = `${mainUrl}/genre/movie/list?${apiKey}&language=en-US`;
const tvUrl = `${mainUrl}/tv/popular?${apiKey}&language=en-US&page=1`;
const tvVideosUrl = `${mainUrl}/tv/`;
const tvGenresUrl = `${mainUrl}/genre/tv/list?${apiKey}&language=en-US`;

const fetchSearch = async (searchQuery, searchPage) => {
  const query = searchQuery;
  const page = `&page=${searchPage}`;
  const response = await fetch(`${searchUrl}${query}${page}`);
  const searchListArray = await response.json();
  return searchListArray.results;
};

const fetchPopular = async () => {
  const response = await fetch(playingNowUrl);
  const nowList = await response.json();
  return nowList.results.sort((a, b) => (a.popularity < b.popularity ? 1 : -1));
};

const fetchVideo = async (id) => {
  const movieID = id;
  const response = await fetch(
    `${videosUrl}${movieID}/videos?${apiKey}&language=en-US`
  );
  const videosData = await response.json();
  const trailerKey = videosData.results
    .filter((video) => video.type === "Trailer")
    .map((item) => item.key);

  return `${youtubeUrl}${trailerKey[0]}`;
};

const fetchGenres = async () => {
  const response = await fetch(genresUrl);
  const genresList = await response.json();
  return genresList.genres;
};

const fetchPopularTV = async () => {
  const response = await fetch(tvUrl);
  const tvList = await response.json();
  return tvList.results.sort((a, b) => (a.popularity < b.popularity ? 1 : -1));
};

const fetchVideoTV = async (id) => {
  const tvID = id;
  const response = await fetch(
    `${tvVideosUrl}${tvID}/videos?${apiKey}&language=en-US`
  );
  const videosData = await response.json();
  const trailerKey = videosData.results
    .filter((video) => video.type === "Trailer")
    .map((item) => item.key);

  return `${youtubeUrl}${trailerKey[0]}`;
};

const fetchGenresTV = async () => {
  const response = await fetch(tvGenresUrl);
  const genresList = await response.json();
  return genresList.genres;
};

export {
  fetchSearch,
  fetchPopular,
  fetchVideo,
  fetchGenres,
  fetchPopularTV,
  fetchVideoTV,
  fetchGenresTV,
};
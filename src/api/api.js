export let api = {
  baseUri: "http://api.themoviedb.org/3/",
  key: "556ce776b643d217adb35e38d7b68d86",
  listUri: "genre/movie/list",
  discoverUri: "discover/movie",
  imgesUri: "http://image.tmdb.org/t/p/",
  lang: "en-US"
};

export let apiConfigUrl = `${api.baseUri}configuration?api_key=${api.key}`;
const API_TOKEN="d0d1806bfbf98bdf69b45a1a47545032";

// API/TMDBApi.js



export function getFilmsFromApiWithSearchedText (text,page) {
  const url = 'https://api.themoviedb.org/3/search/movie?api_key=' + API_TOKEN + 
  '&language=fr&query=' + text + "&page=" + page
  return fetch(url)
         .then((response)=>response.json())
         .catch((error)=>console.error())
}

// API/TMDBApi.js

export function getImageFromApi (name) {
    return 'https://image.tmdb.org/t/p/w300' + name
  }
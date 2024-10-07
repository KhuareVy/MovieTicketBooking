// src/utils/transformData.js
export const transformMovieData = (movies) => {
  return movies.map(movie => ({
    id: movie.id,
    movieCode: movie.id,
    title: movie.title,
    description: movie.description,
    image: movie.posterURL,
    trailer: movie.trailerURL,
    genre: movie.genre.name,
    actor: movie.actors.map(actor => actor.name).join(', '),
    director: movie.director.name,
    country: movie.country.name,
    duration: movie.duration,
    releaseDate: movie.releaseDate,
  }));
};
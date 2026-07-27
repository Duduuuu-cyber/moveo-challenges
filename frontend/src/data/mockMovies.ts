import type { Movie } from '../types/movie';

export const MOCK_MOVIES: Movie[] = [
  {
    id: 101,
    movie_id: 101,
    original_title: "Oppenheimer",
    poster_path: "https://image.tmdb.org/t/p/w500/8Gxv8gSFCU0XGDykEGvC27vUeX1.jpg",
    release_date: "2023-07-21",
    vote_average: 8.9,
    overview: "The story of J. Robert Oppenheimer's role in the development of the atomic bomb during World War II.",
    casts: [
      { id: 1, name: "Cillian Murphy", character: "J. Robert Oppenheimer" },
      { id: 2, name: "Emily Blunt", character: "Katherine Oppenheimer" },
      { id: 3, name: "Matt Damon", character: "Leslie Groves" },
      { id: 4, name: "Robert Downey Jr.", character: "Lewis Strauss" }
    ]
  },
  {
    id: 102,
    movie_id: 102,
    original_title: "Dune: Part Two",
    poster_path: "https://image.tmdb.org/t/p/w500/1pdfLPoL2VFiWxvBjh2SPYhMStM.jpg",
    release_date: "2024-03-01",
    vote_average: 8.7,
    overview: "Paul Atreides unites with Chani and the Fremen while seeking revenge against the conspirators who destroyed his family.",
    casts: [
      { id: 5, name: "Timothée Chalamet", character: "Paul Atreides" },
      { id: 6, name: "Zendaya", character: "Chani" },
      { id: 7, name: "Rebecca Ferguson", character: "Lady Jessica" }
    ]
  },
  {
    id: 103,
    movie_id: 103,
    original_title: "Interstellar",
    poster_path: "https://image.tmdb.org/t/p/w500/gEU2QniE6E77NI6lCU6MxlNBvIx.jpg",
    release_date: "2014-11-07",
    vote_average: 8.6,
    overview: "A team of explorers travel through a wormhole in space in an attempt to ensure humanity's survival.",
    casts: [
      { id: 8, name: "Matthew McConaughey", character: "Cooper" },
      { id: 9, name: "Anne Hathaway", character: "Brand" },
      { id: 10, name: "Jessica Chastain", character: "Murph" }
    ]
  }
];

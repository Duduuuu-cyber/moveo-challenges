import type { Movie } from '../types/movie';

export const MOCK_MOVIES: Movie[] = [
  {
    id: 101,
    movie_id: 101,
    original_title: "Oppenheimer",
    poster_path: "https://images.unsplash.com/photo-1579783902614-a3fb3927b675?q=80&w=600&auto=format&fit=crop",
    release_date: "2023-07-21",
    vote_average: 8.9,
    overview: "The story of J. Robert Oppenheimer's role in the development of the atomic bomb during World War II.",
    casts: [
      { id: 1, name: "Cillian Murphy", character: "J. Robert Oppenheimer", profile_path: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop" },
      { id: 2, name: "Emily Blunt", character: "Katherine Oppenheimer", profile_path: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop" },
      { id: 3, name: "Matt Damon", character: "Leslie Groves", profile_path: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop" },
      { id: 4, name: "Robert Downey Jr.", character: "Lewis Strauss", profile_path: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&auto=format&fit=crop" }
    ]
  },
  {
    id: 102,
    movie_id: 102,
    original_title: "Dune: Part Two",
    poster_path: "https://images.unsplash.com/photo-1534447677768-be436bb09401?q=80&w=600&auto=format&fit=crop",
    release_date: "2024-03-01",
    vote_average: 8.7,
    overview: "Paul Atreides unites with Chani and the Fremen while seeking revenge against the conspirators who destroyed his family.",
    casts: [
      { id: 5, name: "Timothée Chalamet", character: "Paul Atreides", profile_path: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150&auto=format&fit=crop" },
      { id: 6, name: "Zendaya", character: "Chani", profile_path: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&auto=format&fit=crop" },
      { id: 7, name: "Rebecca Ferguson", character: "Lady Jessica", profile_path: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop" },
      { id: 8, name: "Javier Bardem", character: "Stilgar", profile_path: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&auto=format&fit=crop" }
    ]
  },
  {
    id: 103,
    movie_id: 103,
    original_title: "Interstellar",
    poster_path: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=600&auto=format&fit=crop",
    release_date: "2014-11-07",
    vote_average: 8.6,
    overview: "A team of explorers travel through a wormhole in space in an attempt to ensure humanity's survival.",
    casts: [
      { id: 9, name: "Matthew McConaughey", character: "Cooper", profile_path: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=150&auto=format&fit=crop" },
      { id: 10, name: "Anne Hathaway", character: "Brand", profile_path: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=150&auto=format&fit=crop" },
      { id: 11, name: "Jessica Chastain", character: "Murph", profile_path: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop" },
      { id: 12, name: "Michael Caine", character: "Professor Brand", profile_path: "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=150&auto=format&fit=crop" }
    ]
  },
  {
    id: 104,
    movie_id: 104,
    original_title: "Spider-Man: Across the Spider-Verse",
    poster_path: "https://images.unsplash.com/photo-1635863138275-d9b33299680b?q=80&w=600&auto=format&fit=crop",
    release_date: "2023-06-02",
    vote_average: 8.4,
    overview: "Miles Morales catapults across the Multiverse, where he encounters a team of Spider-People charged with protecting its very existence.",
    casts: [
      { id: 13, name: "Shameik Moore", character: "Miles Morales", profile_path: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&auto=format&fit=crop" },
      { id: 14, name: "Hailee Steinfeld", character: "Gwen Stacy", profile_path: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&auto=format&fit=crop" },
      { id: 15, name: "Oscar Isaac", character: "Miguel O'Hara", profile_path: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop" }
    ]
  },
  {
    id: 105,
    movie_id: 105,
    original_title: "The Dark Knight",
    poster_path: "https://images.unsplash.com/photo-1509198397868-475647b2a1e5?q=80&w=600&auto=format&fit=crop",
    release_date: "2008-07-18",
    vote_average: 9.0,
    overview: "When the menace known as the Joker wreaks havoc and chaos on the people of Gotham, Batman must accept one of the greatest psychological and physical tests.",
    casts: [
      { id: 16, name: "Christian Bale", character: "Bruce Wayne / Batman", profile_path: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop" },
      { id: 17, name: "Heath Ledger", character: "Joker", profile_path: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&auto=format&fit=crop" },
      { id: 18, name: "Gary Oldman", character: "Jim Gordon", profile_path: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=150&auto=format&fit=crop" }
    ]
  },
  {
    id: 106,
    movie_id: 106,
    original_title: "Inception",
    poster_path: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?q=80&w=600&auto=format&fit=crop",
    release_date: "2010-07-16",
    vote_average: 8.8,
    overview: "A thief who steals corporate secrets through the use of dream-sharing technology is given the inverse task of planting an idea into the mind of a C.E.O.",
    casts: [
      { id: 19, name: "Leonardo DiCaprio", character: "Cobb", profile_path: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop" },
      { id: 20, name: "Joseph Gordon-Levitt", character: "Arthur", profile_path: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150&auto=format&fit=crop" },
      { id: 21, name: "Elliot Page", character: "Ariadne", profile_path: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop" },
      { id: 22, name: "Tom Hardy", character: "Eames", profile_path: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&auto=format&fit=crop" }
    ]
  },
  {
    id: 107,
    movie_id: 107,
    original_title: "Blade Runner 2049",
    poster_path: "https://images.unsplash.com/photo-1478760329108-5c3ed9d495a0?q=80&w=600&auto=format&fit=crop",
    release_date: "2017-10-06",
    vote_average: 8.3,
    overview: "Young Blade Runner K's discovery of a long-buried secret leads him to track down former Blade Runner Rick Deckard, who's been missing for thirty years.",
    casts: [
      { id: 23, name: "Ryan Gosling", character: "Officer K", profile_path: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop" },
      { id: 24, name: "Harrison Ford", character: "Rick Deckard", profile_path: "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=150&auto=format&fit=crop" },
      { id: 25, name: "Ana de Armas", character: "Joi", profile_path: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop" }
    ]
  },
  {
    id: 108,
    movie_id: 108,
    original_title: "The Matrix",
    poster_path: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?q=80&w=600&auto=format&fit=crop",
    release_date: "1999-03-31",
    vote_average: 8.7,
    overview: "When a beautiful stranger leads computer hacker Neo to a forbidding underworld, he discovers the shocking truth--the life he knows is the elaborate deception of an evil cyber-intelligence.",
    casts: [
      { id: 26, name: "Keanu Reeves", character: "Neo", profile_path: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop" },
      { id: 27, name: "Laurence Fishburne", character: "Morpheus", profile_path: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=150&auto=format&fit=crop" },
      { id: 28, name: "Carrie-Anne Moss", character: "Trinity", profile_path: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop" }
    ]
  },
  {
    id: 109,
    movie_id: 109,
    original_title: "Avatar: The Way of Water",
    poster_path: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?q=80&w=600&auto=format&fit=crop",
    release_date: "2022-12-16",
    vote_average: 7.7,
    overview: "Jake Sully lives with his newfound family formed on the extrasolar moon Pandora. Once a familiar threat returns to finish what was previously started, Jake must work with Neytiri and the army of the Na'vi race.",
    casts: [
      { id: 29, name: "Sam Worthington", character: "Jake Sully", profile_path: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop" },
      { id: 30, name: "Zoe Saldana", character: "Neytiri", profile_path: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&auto=format&fit=crop" },
      { id: 31, name: "Sigourney Weaver", character: "Kiri", profile_path: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop" }
    ]
  }
];

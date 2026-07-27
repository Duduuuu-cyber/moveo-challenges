export interface CastMember {
  id: number;
  name: string;
  original_name?: string;
  character?: string;
  profile_path?: string | null;
}

export interface Movie {
  id: number | string;
  movie_id?: number | string;
  original_title: string;
  poster_path: string | null;
  release_date: string;
  vote_average: number;
  overview: string;
  casts?: CastMember[];
}

export interface PaginatedMovieResponse {
  current_page: number;
  data: Movie[];
  last_page: number;
  total: number;
  next_page_url?: string | null;
}

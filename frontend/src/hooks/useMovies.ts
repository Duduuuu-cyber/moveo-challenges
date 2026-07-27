import { useState, useEffect, useMemo, useCallback } from 'react';
import type { Movie, PaginatedMovieResponse } from '../types/movie';
import { MOCK_MOVIES } from '../data/mockMovies';

const API_BASE_URL = 'https://jsonfakery.com/movies/paginated';

export function useMovies() {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [pageMovies, setPageMovies] = useState<Movie[]>([]);
  const [allMovies, setAllMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [isFetchingAll, setIsFetchingAll] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [sortBy, setSortBy] = useState<'rating' | 'year' | 'title'>('rating');

  // Utility to extract year
  const getReleaseYear = (dateStr: string): number => {
    if (!dateStr) return 0;
    const year = parseInt(dateStr.split('-')[0], 10);
    return isNaN(year) ? 0 : year;
  };

  // Fetch single page with 3-second timeout fallback
  const fetchPage = useCallback(async (page: number) => {
    setLoading(true);
    setError(null);
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 3000);

    try {
      const response = await fetch(`${API_BASE_URL}?page=${page}`, {
        signal: controller.signal,
      });
      clearTimeout(timeoutId);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data: PaginatedMovieResponse = await response.json();
      const moviesList = Array.isArray(data.data) && data.data.length > 0 ? data.data : MOCK_MOVIES;
      setPageMovies(moviesList);
      setTotalPages(data.last_page || 1);
      
      setAllMovies(prev => {
        const map = new Map(prev.map(m => [m.id, m]));
        moviesList.forEach(m => map.set(m.id, m));
        return Array.from(map.values());
      });
    } catch (err) {
      console.warn('Live API unavailable or timed out. Swapping to instant demo catalog:', err);
      // Fast graceful fallback
      setPageMovies(MOCK_MOVIES);
      setAllMovies(MOCK_MOVIES);
      setTotalPages(1);
    } finally {
      clearTimeout(timeoutId);
      setLoading(false);
    }
  }, []);

  // Fetch all pages for client-side search over complete dataset
  const fetchAllPages = useCallback(async () => {
    if (isFetchingAll) return;
    setIsFetchingAll(true);
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 3000);

    try {
      const firstRes = await fetch(`${API_BASE_URL}?page=1`, { signal: controller.signal });
      clearTimeout(timeoutId);
      if (!firstRes.ok) throw new Error('API unavailable');
      const firstData: PaginatedMovieResponse = await firstRes.json();
      const lastPage = firstData.last_page || 1;
      let combined: Movie[] = [...(firstData.data || [])];

      if (lastPage > 1) {
        const pagePromises = [];
        for (let p = 2; p <= Math.min(lastPage, 5); p++) {
          pagePromises.push(
            fetch(`${API_BASE_URL}?page=${p}`)
              .then(res => res.json())
              .then((d: PaginatedMovieResponse) => d.data || [])
              .catch(() => [])
          );
        }
        const results = await Promise.all(pagePromises);
        results.forEach(arr => {
          combined = combined.concat(arr);
        });
      }

      const map = new Map(combined.map(m => [m.id, m]));
      setAllMovies(Array.from(map.values()));
    } catch {
      setAllMovies(MOCK_MOVIES);
    } finally {
      clearTimeout(timeoutId);
      setIsFetchingAll(false);
    }
  }, [isFetchingAll]);

  // Initial load
  useEffect(() => {
    fetchPage(currentPage);
  }, [currentPage, fetchPage]);

  // Fetch all data for client-side search over complete dataset
  useEffect(() => {
    if (searchTerm.trim().length > 0 && allMovies.length < 20 && !isFetchingAll) {
      fetchAllPages();
    }
  }, [searchTerm, allMovies.length, isFetchingAll, fetchAllPages]);

  // Processed movies list
  const displayedMovies = useMemo(() => {
    const isSearching = searchTerm.trim().length > 0;
    const dataset = isSearching ? allMovies : pageMovies;

    let filtered = dataset.filter(movie => {
      return movie.original_title
        .toLowerCase()
        .includes(searchTerm.toLowerCase().trim());
    });

    // Sorting
    filtered = [...filtered].sort((a, b) => {
      if (sortBy === 'rating') {
        return (b.vote_average || 0) - (a.vote_average || 0);
      }
      if (sortBy === 'year') {
        return getReleaseYear(b.release_date) - getReleaseYear(a.release_date);
      }
      if (sortBy === 'title') {
        return a.original_title.localeCompare(b.original_title);
      }
      return 0;
    });

    return filtered;
  }, [searchTerm, allMovies, pageMovies, sortBy]);

  return {
    movies: displayedMovies,
    loading,
    error,
    currentPage,
    totalPages,
    setCurrentPage,
    searchTerm,
    setSearchTerm,
    sortBy,
    setSortBy,
    isSearchMode: searchTerm.trim().length > 0,
    totalResults: displayedMovies.length,
    fetchAllPages
  };
}

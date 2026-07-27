import { renderHook, act, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { useMovies } from '../useMovies';
import { MOCK_MOVIES } from '../../data/mockMovies';

describe('useMovies Hook', () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  it('initializes with fallback data when fetch fails', async () => {
    vi.spyOn(globalThis, 'fetch').mockImplementationOnce(() =>
      Promise.reject(new Error('Network error'))
    );

    const { result } = renderHook(() => useMovies());

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.movies.length).toBeGreaterThan(0);
    expect(result.current.isSearchMode).toBe(false);
  });

  it('filters movies client-side based on search term', async () => {
    vi.spyOn(globalThis, 'fetch').mockImplementationOnce(() =>
      Promise.resolve({
        ok: true,
        json: async () => ({
          current_page: 1,
          last_page: 1,
          total: MOCK_MOVIES.length,
          data: MOCK_MOVIES
        })
      } as Response)
    );

    const { result } = renderHook(() => useMovies());

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    act(() => {
      result.current.setSearchTerm('Oppenheimer');
    });

    expect(result.current.isSearchMode).toBe(true);
    expect(result.current.movies).toHaveLength(1);
    expect(result.current.movies[0].original_title).toBe('Oppenheimer');
  });

  it('sorts movies correctly by year', async () => {
    vi.spyOn(globalThis, 'fetch').mockImplementationOnce(() =>
      Promise.resolve({
        ok: true,
        json: async () => ({
          current_page: 1,
          last_page: 1,
          total: MOCK_MOVIES.length,
          data: MOCK_MOVIES
        })
      } as Response)
    );

    const { result } = renderHook(() => useMovies());

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    act(() => {
      result.current.setSortBy('year');
    });

    const years = result.current.movies.map(m => parseInt(m.release_date.split('-')[0], 10));
    for (let i = 0; i < years.length - 1; i++) {
      expect(years[i]).toBeGreaterThanOrEqual(years[i + 1]);
    }
  });
});

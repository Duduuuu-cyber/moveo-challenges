import React from 'react';
import { MovieCard } from './MovieCard';
import type { Movie } from '../types/movie';

interface MovieGridProps {
  movies: Movie[];
  loading: boolean;
  error: string | null;
  searchTerm: string;
  onClearSearch: () => void;
  onRetry?: () => void;
}

export const MovieGrid: React.FC<MovieGridProps> = ({
  movies,
  loading,
  error,
  searchTerm,
  onClearSearch,
  onRetry
}) => {
  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-start">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="glass-card rounded-2xl p-5 animate-pulse flex gap-5">
            <div className="w-36 h-52 bg-slate-800 rounded-xl shrink-0" />
            <div className="flex-1 space-y-3 pt-2">
              <div className="w-16 h-5 bg-slate-800 rounded-md" />
              <div className="w-3/4 h-6 bg-slate-800 rounded-md" />
              <div className="w-full h-12 bg-slate-800/60 rounded-md" />
              <div className="w-1/2 h-4 bg-slate-800/40 rounded-md pt-4" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (error && movies.length === 0) {
    return (
      <div className="glass-panel border-amber-500/30 bg-amber-500/5 rounded-2xl p-6 text-center max-w-xl mx-auto my-8">
        <div className="w-12 h-12 rounded-2xl bg-amber-500/20 text-amber-400 flex items-center justify-center mx-auto mb-3">
          <span className="text-sm font-bold">!</span>
        </div>
        <h3 className="text-lg font-bold text-amber-200 mb-1">API Notice</h3>
        <p className="text-sm text-slate-300 mb-4">{error}</p>
        <button
          onClick={onRetry || (() => window.location.reload())}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-amber-500/20 hover:bg-amber-500/30 text-amber-200 text-sm font-semibold transition-colors"
        >
          Retry Connection
        </button>
      </div>
    );
  }

  if (movies.length === 0) {
    return (
      <div className="glass-panel rounded-2xl p-12 text-center max-w-md mx-auto my-12 border-slate-800">
        <div className="w-16 h-16 rounded-2xl bg-slate-800/80 text-slate-400 flex items-center justify-center mx-auto mb-4">
          <span className="text-sm">?</span>
        </div>
        <h3 className="text-lg font-bold text-slate-200 mb-1">No Movies Found</h3>
        <p className="text-xs text-slate-400 mb-6">
          We couldn&apos;t find any movie title matching &quot;<span className="text-indigo-400">{searchTerm}</span>&quot;.
        </p>
        <button
          onClick={onClearSearch}
          className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold shadow-lg shadow-indigo-500/20 transition-all"
        >
          Clear Search Filter
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {error && (
        <div className="glass-panel border-amber-500/30 bg-amber-500/10 rounded-2xl p-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center shrink-0">
              <span className="text-sm font-bold">!</span>
            </div>
            <div>
              <h4 className="text-sm font-semibold text-amber-200">API Connection Notice</h4>
              <p className="text-xs text-slate-300">{error}</p>
            </div>
          </div>
          <button
            onClick={onRetry || (() => window.location.reload())}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-amber-500/20 hover:bg-amber-500/30 text-amber-200 text-xs font-semibold transition-colors shrink-0"
          >
            Retry Connection
          </button>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-start">
        {movies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
    </div>
  );
};

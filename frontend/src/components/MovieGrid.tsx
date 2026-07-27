import React from 'react';
import { MovieCard } from './MovieCard';
import type { Movie } from '../types/movie';
import { Film, AlertCircle, RefreshCw } from 'lucide-react';

interface MovieGridProps {
  movies: Movie[];
  loading: boolean;
  error: string | null;
  searchTerm: string;
  onClearSearch: () => void;
}

export const MovieGrid: React.FC<MovieGridProps> = ({
  movies,
  loading,
  error,
  searchTerm,
  onClearSearch
}) => {
  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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

  if (error) {
    return (
      <div className="glass-panel border-amber-500/30 bg-amber-500/5 rounded-2xl p-6 text-center max-w-xl mx-auto my-8">
        <div className="w-12 h-12 rounded-2xl bg-amber-500/20 text-amber-400 flex items-center justify-center mx-auto mb-3">
          <AlertCircle className="w-6 h-6" />
        </div>
        <h3 className="text-lg font-bold text-amber-200 mb-1">API Notice</h3>
        <p className="text-sm text-slate-300 mb-4">{error}</p>
        <button
          onClick={() => window.location.reload()}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-amber-500/20 hover:bg-amber-500/30 text-amber-200 text-sm font-semibold transition-colors"
        >
          <RefreshCw className="w-4 h-4" />
          <span>Retry Connection</span>
        </button>
      </div>
    );
  }

  if (movies.length === 0) {
    return (
      <div className="glass-panel rounded-2xl p-12 text-center max-w-md mx-auto my-12 border-slate-800">
        <div className="w-16 h-16 rounded-2xl bg-slate-800/80 text-slate-400 flex items-center justify-center mx-auto mb-4">
          <Film className="w-8 h-8 opacity-40" />
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
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {movies.map((movie) => (
        <MovieCard key={movie.id} movie={movie} />
      ))}
    </div>
  );
};

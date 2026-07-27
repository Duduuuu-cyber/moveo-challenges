import React from 'react';
import { Search, Film, Sparkles, X, ArrowUpDown } from 'lucide-react';

interface HeaderProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  sortBy: 'rating' | 'year' | 'title';
  onSortChange: (sort: 'rating' | 'year' | 'title') => void;
  totalResults: number;
  isSearchMode: boolean;
}

export const Header: React.FC<HeaderProps> = ({
  searchTerm,
  onSearchChange,
  sortBy,
  onSortChange,
  totalResults,
  isSearchMode
}) => {
  return (
    <header className="sticky top-0 z-50 glass-panel border-b border-slate-800/80 px-4 lg:px-8 py-4">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Brand Logo */}
        <div className="flex items-center gap-3 w-full md:w-auto justify-between md:justify-start">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 to-violet-500 flex items-center justify-center shadow-lg shadow-indigo-500/25">
              <Film className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold bg-gradient-to-r from-white via-slate-100 to-indigo-200 bg-clip-text text-transparent">
                CinePulse
              </h1>
              <p className="text-xs text-slate-400 font-medium flex items-center gap-1">
                <span>Moveo.AI Frontend Challenge</span>
                <Sparkles className="w-3 h-3 text-indigo-400 inline" />
              </p>
            </div>
          </div>

          <div className="md:hidden text-xs px-2.5 py-1 rounded-full bg-slate-800 text-slate-300">
            {totalResults} {totalResults === 1 ? 'Movie' : 'Movies'}
          </div>
        </div>

        {/* Search & Filter Controls */}
        <div className="flex flex-col sm:flex-row items-center gap-3 w-full md:w-auto">
          {/* Search Input */}
          <div className="relative w-full sm:w-80">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="Search movies by title..."
              className="w-full bg-slate-900/90 text-slate-100 pl-10 pr-9 py-2.5 rounded-xl border border-slate-800 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 text-sm transition-all duration-200 placeholder:text-slate-500"
            />
            {searchTerm && (
              <button
                onClick={() => onSearchChange('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white p-0.5 rounded-md hover:bg-slate-800 transition-colors"
                aria-label="Clear search"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Sort Selector */}
          <div className="flex items-center gap-2 w-full sm:w-auto justify-between sm:justify-start bg-slate-900/90 border border-slate-800 rounded-xl px-3 py-2 text-sm text-slate-300">
            <div className="flex items-center gap-1.5 text-slate-400">
              <ArrowUpDown className="w-4 h-4" />
              <span className="text-xs">Sort:</span>
            </div>
            <select
              value={sortBy}
              onChange={(e) => onSortChange(e.target.value as 'rating' | 'year' | 'title')}
              className="bg-transparent text-slate-200 text-sm focus:outline-none cursor-pointer font-medium"
            >
              <option value="rating" className="bg-slate-900 text-slate-200">Highest Rating</option>
              <option value="year" className="bg-slate-900 text-slate-200">Release Year</option>
              <option value="title" className="bg-slate-900 text-slate-200">Alphabetical</option>
            </select>
          </div>
        </div>
      </div>

      {/* Search Mode Active Banner */}
      {isSearchMode && (
        <div className="max-w-7xl mx-auto mt-3 pt-3 border-t border-slate-800/60 flex items-center justify-between text-xs text-slate-400">
          <span>
            Client-side search active over complete dataset. Found <strong className="text-indigo-400">{totalResults}</strong> result(s) for &quot;{searchTerm}&quot;.
          </span>
          <button
            onClick={() => onSearchChange('')}
            className="text-indigo-400 hover:text-indigo-300 font-medium underline underline-offset-2"
          >
            Clear Search
          </button>
        </div>
      )}
    </header>
  );
};

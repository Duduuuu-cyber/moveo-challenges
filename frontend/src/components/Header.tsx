import React from 'react';

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
        <div className="flex flex-col md:flex-row items-start md:items-center gap-4 w-full md:w-auto">
          <div>
            <h1 className="text-xl font-bold text-white">CinePulse</h1>
            <p className="text-xs text-slate-400">Frontend Challenge Movie Catalog</p>
          </div>

          <div className="hidden md:block text-xs rounded-full bg-slate-900 border border-slate-800 px-3 py-1 text-slate-300">
            {totalResults} {totalResults === 1 ? 'Movie' : 'Movies'}
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-center gap-3 w-full md:w-auto">
          <div className="relative w-full sm:w-80">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="Search movies by title..."
              className="w-full bg-slate-900/90 text-slate-100 pl-4 pr-4 py-2.5 rounded-xl border border-slate-800 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 text-sm transition-all duration-200 placeholder:text-slate-500"
            />
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto justify-between sm:justify-start bg-slate-900/90 border border-slate-800 rounded-xl px-3 py-2 text-sm text-slate-300">
            <span className="text-xs text-slate-400">Sort:</span>
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

      {isSearchMode && (
        <div className="max-w-7xl mx-auto mt-3 pt-3 border-t border-slate-800/60 flex items-center justify-between text-xs text-slate-400">
          <span>
            Client-side search active over complete dataset. Found <strong className="text-indigo-400">{totalResults}</strong> result(s) for "{searchTerm}".
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

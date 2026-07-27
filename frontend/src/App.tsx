import { useMovies } from './hooks/useMovies';
import { Header } from './components/Header';
import { MovieGrid } from './components/MovieGrid';
import { Pagination } from './components/Pagination';
import { Sparkles, Layers, Search, ShieldCheck } from 'lucide-react';

export function App() {
  const {
    movies,
    loading,
    error,
    currentPage,
    totalPages,
    setCurrentPage,
    searchTerm,
    setSearchTerm,
    sortBy,
    setSortBy,
    isSearchMode,
    totalResults
  } = useMovies();

  return (
    <div className="min-h-screen flex flex-col bg-slate-950 text-slate-100 selection:bg-indigo-500 selection:text-white">
      {/* Header Bar */}
      <Header
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        sortBy={sortBy}
        onSortChange={setSortBy}
        totalResults={totalResults}
        isSearchMode={isSearchMode}
      />

      {/* Hero Header */}
      <section className="relative overflow-hidden border-b border-slate-800/60 bg-gradient-to-b from-slate-900/60 via-slate-950 to-slate-950 px-4 lg:px-8 py-10">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-center md:text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-xs font-semibold text-indigo-400">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Static JSON Fakery API Integration</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
              Movie Catalog &amp; Client-Side Search
            </h2>
            <p className="text-sm text-slate-400 max-w-xl">
              Browse movies, search titles client-side across all paginated records, and expand movie items in-place to inspect cast details.
            </p>
          </div>

          {/* Key Metrics Pill Badges */}
          <div className="flex items-center gap-3 shrink-0">
            <div className="glass-panel px-4 py-3 rounded-2xl flex items-center gap-3 border-slate-800">
              <Layers className="w-5 h-5 text-indigo-400" />
              <div className="text-left">
                <div className="text-xs text-slate-400 font-medium">Dataset Mode</div>
                <div className="text-sm font-bold text-slate-200">
                  {isSearchMode ? 'Full Local Scan' : 'Paginated API'}
                </div>
              </div>
            </div>

            <div className="glass-panel px-4 py-3 rounded-2xl flex items-center gap-3 border-slate-800">
              <ShieldCheck className="w-5 h-5 text-emerald-400" />
              <div className="text-left">
                <div className="text-xs text-slate-400 font-medium">Performance</div>
                <div className="text-sm font-bold text-slate-200">In-Place Motion</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 lg:px-8 py-8">
        <MovieGrid
          movies={movies}
          loading={loading}
          error={error}
          searchTerm={searchTerm}
          onClearSearch={() => setSearchTerm('')}
        />

        {!isSearchMode && (
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
            disabled={loading}
          />
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-900 bg-slate-950 py-6 text-center text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-3">
          <span>Moveo.AI Frontend Engineer Challenge Solution &copy; 2026</span>
          <div className="flex items-center gap-4 text-slate-400">
            <span className="flex items-center gap-1">
              <Search className="w-3.5 h-3.5 text-indigo-400" /> Client-Side Search
            </span>
            <span>React + Tailwind CSS + Vitest</span>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;

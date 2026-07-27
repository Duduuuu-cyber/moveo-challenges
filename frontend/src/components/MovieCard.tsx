import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, Calendar, Users, ChevronDown, Film, UserCheck } from 'lucide-react';
import type { Movie } from '../types/movie';

interface MovieCardProps {
  movie: Movie;
}

export const MovieCard: React.FC<MovieCardProps> = ({ movie }) => {
  const [isExpanded, setIsExpanded] = useState<boolean>(false);
  const [imageError, setImageError] = useState<boolean>(false);

  const releaseYear = movie.release_date ? movie.release_date.split('-')[0] : 'N/A';
  const rating = movie.vote_average ? Number(movie.vote_average).toFixed(1) : 'N/A';
  const mainCasts = movie.casts ? movie.casts.slice(0, 6) : [];

  const fallbackPoster = 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?q=80&w=500&auto=format&fit=crop';
  const posterUrl = !imageError && movie.poster_path ? movie.poster_path : fallbackPoster;

  return (
    <motion.article
      layout
      transition={{ layout: { duration: 0.35, ease: [0.25, 1, 0.5, 1] } }}
      onClick={() => setIsExpanded(prev => !prev)}
      className={`glass-card rounded-2xl overflow-hidden cursor-pointer transition-all duration-300 ${
        isExpanded
          ? 'ring-2 ring-indigo-500/80 shadow-2xl shadow-indigo-500/10 col-span-1 md:col-span-2 lg:col-span-2'
          : 'hover:-translate-y-1'
      }`}
      aria-expanded={isExpanded}
    >
      <div className="p-4 sm:p-5">
        <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 items-start">
          {/* Movie Poster */}
          <div className="relative w-full sm:w-36 h-52 sm:h-52 rounded-xl overflow-hidden shrink-0 bg-slate-900 shadow-md">
            <img
              src={posterUrl}
              alt={movie.original_title}
              onError={() => setImageError(true)}
              className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
              loading="lazy"
            />
            {/* Rating Badge */}
            <div className="absolute top-2.5 right-2.5 bg-slate-950/85 backdrop-blur-md px-2 py-1 rounded-lg border border-slate-700/50 flex items-center gap-1 text-xs font-bold text-amber-400">
              <Star className="w-3.5 h-3.5 fill-amber-400" />
              <span>{rating}</span>
            </div>
          </div>

          {/* Core Info */}
          <div className="flex-1 min-w-0 w-full">
            <div className="flex items-start justify-between gap-3">
              <div>
                <span className="inline-flex items-center gap-1 text-xs font-semibold text-indigo-400 bg-indigo-500/10 px-2.5 py-0.5 rounded-md mb-2 border border-indigo-500/20">
                  <Calendar className="w-3 h-3" />
                  {releaseYear}
                </span>
                <h3 className="text-lg sm:text-xl font-bold text-slate-100 leading-snug group-hover:text-indigo-300 transition-colors line-clamp-2">
                  {movie.original_title}
                </h3>
              </div>

              {/* Expand Indicator */}
              <button
                className={`p-2 rounded-xl bg-slate-800/80 text-slate-400 hover:text-white hover:bg-slate-700/80 transition-all duration-300 ${
                  isExpanded ? 'rotate-180 bg-indigo-600 text-white' : ''
                }`}
                aria-label={isExpanded ? 'Collapse movie details' : 'Expand movie details'}
              >
                <ChevronDown className="w-5 h-5" />
              </button>
            </div>

            {/* Overview Snippet */}
            <p className={`mt-2.5 text-xs sm:text-sm text-slate-300/90 leading-relaxed ${isExpanded ? '' : 'line-clamp-3'}`}>
              {movie.overview || 'No synopsis available for this movie title.'}
            </p>

            {/* Tap to expand prompt if not expanded */}
            {!isExpanded && (
              <div className="mt-3 flex items-center justify-between text-xs text-indigo-400 font-medium pt-2 border-t border-slate-800/60">
                <span className="flex items-center gap-1.5">
                  <Users className="w-3.5 h-3.5" />
                  <span>{mainCasts.length > 0 ? `${mainCasts.length}+ Cast Members` : 'View Cast & Details'}</span>
                </span>
                <span className="text-slate-400 text-[11px]">Click to expand &rarr;</span>
              </div>
            )}
          </div>
        </div>

        {/* In-Place Expanded Detail View */}
        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3, ease: 'easeInOut' }}
              className="overflow-hidden"
            >
              <div className="mt-6 pt-5 border-t border-slate-800/80 space-y-4">
                {/* Cast Section */}
                <div>
                  <h4 className="text-sm font-bold text-slate-200 flex items-center gap-2 mb-3">
                    <Users className="w-4 h-4 text-indigo-400" />
                    <span>Cast Members</span>
                  </h4>

                  {mainCasts.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5">
                      {mainCasts.map((cast, index) => (
                        <div
                          key={cast.id || index}
                          className="flex items-center gap-3 p-2.5 rounded-xl bg-slate-900/80 border border-slate-800/80"
                        >
                          <div className="w-9 h-9 rounded-lg bg-indigo-950 text-indigo-400 border border-indigo-500/30 flex items-center justify-center shrink-0 overflow-hidden font-bold text-xs">
                            {cast.profile_path ? (
                              <img
                                src={cast.profile_path}
                                alt={cast.name}
                                className="w-full h-full object-cover"
                                onError={(e) => {
                                  (e.target as HTMLImageElement).style.display = 'none';
                                }}
                              />
                            ) : (
                              <UserCheck className="w-4 h-4" />
                            )}
                          </div>
                          <div className="min-w-0">
                            <p className="text-xs font-semibold text-slate-100 truncate">{cast.name}</p>
                            {cast.character && (
                              <p className="text-[11px] text-slate-400 truncate">as {cast.character}</p>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-xs text-slate-400 italic bg-slate-900/40 p-3 rounded-xl border border-slate-800/60">
                      Cast information is not specified for this record in the static dataset.
                    </p>
                  )}
                </div>

                {/* Additional Metadata Footer */}
                <div className="flex flex-wrap items-center justify-between text-xs text-slate-400 pt-3 border-t border-slate-800/40 gap-2">
                  <span className="flex items-center gap-1.5">
                    <Film className="w-3.5 h-3.5 text-indigo-400" />
                    Static JSON Record ID: <strong className="text-slate-200">{movie.id}</strong>
                  </span>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setIsExpanded(false);
                    }}
                    className="px-3 py-1.5 rounded-lg bg-slate-800 text-slate-200 hover:bg-slate-700 transition-colors font-medium text-xs"
                  >
                    Collapse Detail
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.article>
  );
};

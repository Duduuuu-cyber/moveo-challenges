import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
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
      transition={{ layout: { duration: 0.3, ease: 'easeInOut' } }}
      onClick={() => setIsExpanded(prev => !prev)}
      className={`glass-card rounded-2xl overflow-hidden cursor-pointer transition-all duration-300 flex flex-col h-auto ${
        isExpanded
          ? 'ring-2 ring-indigo-500/80 shadow-2xl shadow-indigo-500/10 bg-slate-900/90'
          : 'hover:-translate-y-1'
      }`}
      aria-expanded={isExpanded}
    >
      <div className="p-4 sm:p-5 flex flex-col">
        <div className="flex flex-col sm:flex-row gap-4 items-start">
          <div className="relative w-full sm:w-32 h-44 sm:h-44 rounded-xl overflow-hidden shrink-0 bg-slate-950 shadow-md">
            <img
              src={posterUrl}
              alt={movie.original_title}
              onError={() => setImageError(true)}
              className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
              loading="lazy"
            />
            <div className="absolute top-2 right-2 bg-slate-950/85 backdrop-blur-md px-2 py-0.5 rounded-lg border border-slate-700/50 flex items-center gap-1 text-xs font-bold text-amber-400">
              <span>{rating}</span>
            </div>
          </div>

          <div className="flex-1 min-w-0 w-full">
            <div className="flex items-start justify-between gap-2">
              <div>
                <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-indigo-400 bg-indigo-500/10 px-2 py-0.5 rounded-md mb-1.5 border border-indigo-500/20">
                  {releaseYear}
                </span>
                <h3 className="text-base font-bold text-slate-100 leading-snug transition-colors line-clamp-2">
                  {movie.original_title}
                </h3>
              </div>

              <button
                className={`p-1.5 rounded-lg bg-slate-800/80 text-slate-400 hover:text-white transition-all duration-300 shrink-0 ${
                  isExpanded ? 'rotate-180 bg-indigo-600 text-white' : ''
                }`}
                aria-label={isExpanded ? 'Collapse movie details' : 'Expand movie details'}
              >
                {isExpanded ? '?' : '?'}
              </button>
            </div>

            <p className={`mt-2 text-xs text-slate-300/90 leading-relaxed ${isExpanded ? '' : 'line-clamp-3'}`}>
              {movie.overview || 'No synopsis available for this movie title.'}
            </p>

            {!isExpanded && (
              <div className="mt-3 flex items-center justify-between text-[11px] text-indigo-400 font-medium pt-2 border-t border-slate-800/60">
                <span className="flex items-center gap-1">
                  {mainCasts.length > 0 ? `${mainCasts.length}+ Cast Members` : 'Details'}
                </span>
                <span className="text-slate-400 text-[10px]">Expand ?</span>
              </div>
            )}
          </div>
        </div>

        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3, ease: 'easeInOut' }}
              className="overflow-hidden"
            >
              <div className="mt-4 pt-4 border-t border-slate-800/80 space-y-3">
                <div>
                  <h4 className="text-xs font-bold text-slate-200 mb-2.5">
                    Main Cast Members
                  </h4>

                  {mainCasts.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {mainCasts.map((cast, index) => (
                        <div
                          key={cast.id || index}
                          className="flex items-center gap-2.5 p-2 rounded-lg bg-slate-950/60 border border-slate-800/60"
                        >
                          <div className="w-8 h-8 rounded-md bg-indigo-950 text-indigo-400 border border-indigo-500/30 flex items-center justify-center shrink-0 overflow-hidden font-bold text-xs">
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
                              <span>?</span>
                            )}
                          </div>
                          <div className="min-w-0">
                            <p className="text-xs font-semibold text-slate-100 truncate">{cast.name}</p>
                            {cast.character && (
                              <p className="text-[10px] text-slate-400 truncate">as {cast.character}</p>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-xs text-slate-400 italic bg-slate-900/40 p-2.5 rounded-lg border border-slate-800/60">
                      Cast details not available in this static JSON record.
                    </p>
                  )}
                </div>

                <div className="flex items-center justify-between text-[11px] text-slate-400 pt-2 border-t border-slate-800/40 gap-2">
                  <span className="text-slate-400">Record ID: <strong className="text-slate-200">{movie.id}</strong></span>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setIsExpanded(false);
                    }}
                    className="px-2.5 py-1 rounded-md bg-slate-800 text-slate-200 hover:bg-slate-700 transition-colors font-medium text-[11px]"
                  >
                    Collapse
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

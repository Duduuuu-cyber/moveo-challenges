import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  disabled?: boolean;
}

export const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
  disabled
}) => {
  if (totalPages <= 1) return null;

  return (
    <div className="flex items-center justify-center gap-2 mt-10">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage <= 1 || disabled}
        className="p-2.5 rounded-xl glass-card text-slate-300 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed hover:bg-slate-800 transition-colors"
        aria-label="Previous Page"
      >
        <ChevronLeft className="w-5 h-5" />
      </button>

      <span className="px-4 py-2 rounded-xl bg-slate-900 border border-slate-800 text-xs font-semibold text-slate-300">
        Page <strong className="text-indigo-400">{currentPage}</strong> of <strong>{totalPages}</strong>
      </span>

      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage >= totalPages || disabled}
        className="p-2.5 rounded-xl glass-card text-slate-300 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed hover:bg-slate-800 transition-colors"
        aria-label="Next Page"
      >
        <ChevronRight className="w-5 h-5" />
      </button>
    </div>
  );
};

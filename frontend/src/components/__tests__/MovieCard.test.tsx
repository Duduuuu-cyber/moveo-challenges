import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { MovieCard } from '../MovieCard';
import type { Movie } from '../../types/movie';

const mockMovie: Movie = {
  id: 1,
  original_title: 'Inception',
  poster_path: 'https://example.com/poster.jpg',
  release_date: '2010-07-16',
  vote_average: 8.8,
  overview: 'A thief who steals corporate secrets through the use of dream-sharing technology.',
  casts: [
    { id: 1, name: 'Leonardo DiCaprio', character: 'Cobb' },
    { id: 2, name: 'Joseph Gordon-Levitt', character: 'Arthur' }
  ]
};

describe('MovieCard Component', () => {
  it('renders basic movie details correctly', () => {
    render(<MovieCard movie={mockMovie} />);

    expect(screen.getByText('Inception')).toBeInTheDocument();
    expect(screen.getByText('2010')).toBeInTheDocument();
    expect(screen.getByText('8.8')).toBeInTheDocument();
    expect(screen.getByText(/A thief who steals corporate secrets/i)).toBeInTheDocument();
  });

  it('expands in place on click to show cast list', () => {
    render(<MovieCard movie={mockMovie} />);

    const card = screen.getByRole('article');
    expect(card).toHaveAttribute('aria-expanded', 'false');

    fireEvent.click(card);

    expect(card).toHaveAttribute('aria-expanded', 'true');
    expect(screen.getByText('Leonardo DiCaprio')).toBeInTheDocument();
    expect(screen.getByText('as Cobb')).toBeInTheDocument();
  });

  it('collapses back when clicked again', () => {
    render(<MovieCard movie={mockMovie} />);

    const card = screen.getByRole('article');
    fireEvent.click(card);
    expect(card).toHaveAttribute('aria-expanded', 'true');

    fireEvent.click(card);
    expect(card).toHaveAttribute('aria-expanded', 'false');
  });
});

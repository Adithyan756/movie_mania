import { useState } from 'react';
import { Navigation } from './components/Navigation';
import { HomePage } from './components/HomePage';
import { AddMoviePage } from './components/AddMoviePage';
import { ReviewsPage } from './components/ReviewsPage';

export type Movie = {
  id: number;
  title: string;
  genre: string;
  description: string;
  poster_url: string;
  rating: number;
};

// Mock initial data - simulating database
const initialMovies: Movie[] = [
  {
    id: 1,
    title: "The Shawshank Redemption",
    genre: "Drama",
    description: "Two imprisoned men bond over a number of years, finding solace and eventual redemption through acts of common decency.",
    poster_url: "https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=500&h=750&fit=crop",
    rating: 9.3
  },
  {
    id: 2,
    title: "Inception",
    genre: "Sci-Fi",
    description: "A thief who steals corporate secrets through the use of dream-sharing technology is given the inverse task of planting an idea.",
    poster_url: "https://images.unsplash.com/photo-1485095329183-d0797cdc5676?w=500&h=750&fit=crop",
    rating: 8.8
  },
  {
    id: 3,
    title: "The Dark Knight",
    genre: "Action",
    description: "When the menace known as the Joker wreaks havoc and chaos on the people of Gotham, Batman must accept one of the greatest tests.",
    poster_url: "https://images.unsplash.com/photo-1509347528160-9a9e33742cdb?w=500&h=750&fit=crop",
    rating: 9.0
  },
  {
    id: 4,
    title: "Pulp Fiction",
    genre: "Crime",
    description: "The lives of two mob hitmen, a boxer, a gangster and his wife intertwine in four tales of violence and redemption.",
    poster_url: "https://images.unsplash.com/photo-1598899134739-24c46f58b8c0?w=500&h=750&fit=crop",
    rating: 8.9
  },
  {
    id: 5,
    title: "Forrest Gump",
    genre: "Drama",
    description: "The presidencies of Kennedy and Johnson unfold through the perspective of an Alabama man with an IQ of 75.",
    poster_url: "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=500&h=750&fit=crop",
    rating: 8.8
  }
];

export default function App() {
  const [currentPage, setCurrentPage] = useState<'home' | 'add' | 'reviews'>('home');
  const [movies, setMovies] = useState<Movie[]>(initialMovies);
  const [editingMovie, setEditingMovie] = useState<Movie | null>(null);

  // CRUD Operations
  const addMovie = (movie: Omit<Movie, 'id'>) => {
    const newMovie = {
      ...movie,
      id: Math.max(...movies.map(m => m.id), 0) + 1
    };
    setMovies([...movies, newMovie]);
  };

  const updateMovie = (id: number, updatedMovie: Omit<Movie, 'id'>) => {
    setMovies(movies.map(movie => 
      movie.id === id ? { ...updatedMovie, id } : movie
    ));
    setEditingMovie(null);
  };

  const deleteMovie = (id: number) => {
    if (window.confirm('Are you sure you want to delete this movie?')) {
      setMovies(movies.filter(movie => movie.id !== id));
    }
  };

  const handleEdit = (movie: Movie) => {
    setEditingMovie(movie);
    setCurrentPage('add');
  };

  const handleCancelEdit = () => {
    setEditingMovie(null);
  };

  return (
    <div className="min-h-screen bg-gray-950">
      <Navigation currentPage={currentPage} onNavigate={setCurrentPage} />
      
      <main>
        {currentPage === 'home' && (
          <HomePage 
            movies={movies} 
            onDelete={deleteMovie}
            onEdit={handleEdit}
          />
        )}
        {currentPage === 'add' && (
          <AddMoviePage 
            onAdd={addMovie}
            onUpdate={updateMovie}
            editingMovie={editingMovie}
            onCancelEdit={handleCancelEdit}
            onNavigate={setCurrentPage}
          />
        )}
        {currentPage === 'reviews' && <ReviewsPage />}
      </main>
    </div>
  );
}

import { useState, useEffect } from 'react';
import { Save, X, Film } from 'lucide-react';
import type { Movie } from '../App';

type AddMoviePageProps = {
  onAdd: (movie: Omit<Movie, 'id'>) => void;
  onUpdate: (id: number, movie: Omit<Movie, 'id'>) => void;
  editingMovie: Movie | null;
  onCancelEdit: () => void;
  onNavigate: (page: 'home' | 'add' | 'reviews') => void;
};

export function AddMoviePage({ onAdd, onUpdate, editingMovie, onCancelEdit, onNavigate }: AddMoviePageProps) {
  const [formData, setFormData] = useState({
    title: '',
    genre: '',
    description: '',
    poster_url: '',
    rating: ''
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  // Populate form when editing
  useEffect(() => {
    if (editingMovie) {
      setFormData({
        title: editingMovie.title,
        genre: editingMovie.genre,
        description: editingMovie.description,
        poster_url: editingMovie.poster_url,
        rating: editingMovie.rating.toString()
      });
    }
  }, [editingMovie]);

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.title.trim()) {
      newErrors.title = 'Title is required';
    }

    if (!formData.genre.trim()) {
      newErrors.genre = 'Genre is required';
    }

    if (!formData.description.trim()) {
      newErrors.description = 'Description is required';
    }

    if (!formData.poster_url.trim()) {
      newErrors.poster_url = 'Poster URL is required';
    } else if (!formData.poster_url.match(/^https?:\/\/.+/)) {
      newErrors.poster_url = 'Please enter a valid URL';
    }

    if (!formData.rating) {
      newErrors.rating = 'Rating is required';
    } else {
      const ratingNum = parseFloat(formData.rating);
      if (isNaN(ratingNum) || ratingNum < 0 || ratingNum > 10) {
        newErrors.rating = 'Rating must be between 0 and 10';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    const movieData = {
      title: formData.title.trim(),
      genre: formData.genre.trim(),
      description: formData.description.trim(),
      poster_url: formData.poster_url.trim(),
      rating: parseFloat(formData.rating)
    };

    if (editingMovie) {
      onUpdate(editingMovie.id, movieData);
    } else {
      onAdd(movieData);
    }

    // Reset form
    setFormData({
      title: '',
      genre: '',
      description: '',
      poster_url: '',
      rating: ''
    });
    setErrors({});
    
    // Navigate to home
    onNavigate('home');
  };

  const handleCancel = () => {
    if (editingMovie) {
      onCancelEdit();
    }
    setFormData({
      title: '',
      genre: '',
      description: '',
      poster_url: '',
      rating: ''
    });
    setErrors({});
    onNavigate('home');
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-gradient-to-br from-gray-900 via-purple-900/20 to-gray-900">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-gray-800 rounded-xl shadow-2xl p-6 sm:p-8">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 bg-purple-600 rounded-lg flex items-center justify-center">
              <Film className="w-6 h-6 text-white" />
            </div>
            <h2 className="text-white text-2xl">
              {editingMovie ? 'Edit Movie' : 'Add New Movie'}
            </h2>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Title */}
            <div>
              <label htmlFor="title" className="block text-gray-300 mb-2">
                Movie Title *
              </label>
              <input
                id="title"
                type="text"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className={`w-full px-4 py-3 bg-gray-900 border ${
                  errors.title ? 'border-red-500' : 'border-gray-700'
                } rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent`}
                placeholder="Enter movie title"
              />
              {errors.title && (
                <p className="text-red-400 text-sm mt-1">{errors.title}</p>
              )}
            </div>

            {/* Genre */}
            <div>
              <label htmlFor="genre" className="block text-gray-300 mb-2">
                Genre *
              </label>
              <input
                id="genre"
                type="text"
                value={formData.genre}
                onChange={(e) => setFormData({ ...formData, genre: e.target.value })}
                className={`w-full px-4 py-3 bg-gray-900 border ${
                  errors.genre ? 'border-red-500' : 'border-gray-700'
                } rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent`}
                placeholder="e.g., Action, Drama, Sci-Fi"
              />
              {errors.genre && (
                <p className="text-red-400 text-sm mt-1">{errors.genre}</p>
              )}
            </div>

            {/* Rating */}
            <div>
              <label htmlFor="rating" className="block text-gray-300 mb-2">
                Rating (0-10) *
              </label>
              <input
                id="rating"
                type="number"
                step="0.1"
                min="0"
                max="10"
                value={formData.rating}
                onChange={(e) => setFormData({ ...formData, rating: e.target.value })}
                className={`w-full px-4 py-3 bg-gray-900 border ${
                  errors.rating ? 'border-red-500' : 'border-gray-700'
                } rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent`}
                placeholder="e.g., 8.5"
              />
              {errors.rating && (
                <p className="text-red-400 text-sm mt-1">{errors.rating}</p>
              )}
            </div>

            {/* Poster URL */}
            <div>
              <label htmlFor="poster_url" className="block text-gray-300 mb-2">
                Poster URL *
              </label>
              <input
                id="poster_url"
                type="url"
                value={formData.poster_url}
                onChange={(e) => setFormData({ ...formData, poster_url: e.target.value })}
                className={`w-full px-4 py-3 bg-gray-900 border ${
                  errors.poster_url ? 'border-red-500' : 'border-gray-700'
                } rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent`}
                placeholder="https://example.com/poster.jpg"
              />
              {errors.poster_url && (
                <p className="text-red-400 text-sm mt-1">{errors.poster_url}</p>
              )}
            </div>

            {/* Description */}
            <div>
              <label htmlFor="description" className="block text-gray-300 mb-2">
                Description *
              </label>
              <textarea
                id="description"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                rows={4}
                className={`w-full px-4 py-3 bg-gray-900 border ${
                  errors.description ? 'border-red-500' : 'border-gray-700'
                } rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none`}
                placeholder="Enter movie description"
              />
              {errors.description && (
                <p className="text-red-400 text-sm mt-1">{errors.description}</p>
              )}
            </div>

            {/* Action Buttons */}
            <div className="flex gap-4 pt-4">
              <button
                type="submit"
                className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-colors"
              >
                <Save className="w-5 h-5" />
                {editingMovie ? 'Update Movie' : 'Save Movie'}
              </button>
              
              <button
                type="button"
                onClick={handleCancel}
                className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition-colors"
              >
                <X className="w-5 h-5" />
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

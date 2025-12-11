import { X, Star, Calendar, Film } from 'lucide-react';
import type { Movie } from '../App';

type MovieDetailModalProps = {
  movie: Movie;
  onClose: () => void;
};

export function MovieDetailModal({ movie, onClose }: MovieDetailModalProps) {
  return (
    <div 
      className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div 
        className="bg-gray-800 rounded-xl max-w-4xl w-full max-h-[90vh] overflow-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative">
          {/* Header with Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-10 bg-gray-900/90 hover:bg-gray-900 text-white p-2 rounded-full transition-colors"
          >
            <X className="w-6 h-6" />
          </button>

          {/* Movie Poster and Details */}
          <div className="grid md:grid-cols-2 gap-6 p-6">
            {/* Poster */}
            <div className="aspect-[2/3] rounded-lg overflow-hidden">
              <img
                src={movie.poster_url}
                alt={movie.title}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Details */}
            <div className="flex flex-col">
              <h2 className="text-white text-3xl mb-4">{movie.title}</h2>
              
              <div className="flex flex-wrap gap-4 mb-6">
                <div className="flex items-center gap-2">
                  <Film className="w-5 h-5 text-purple-400" />
                  <span className="text-gray-300">{movie.genre}</span>
                </div>
                
                <div className="flex items-center gap-2">
                  <Star className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                  <span className="text-yellow-400">{movie.rating}/10</span>
                </div>
              </div>

              <div className="mb-6">
                <h3 className="text-white mb-2">Overview</h3>
                <p className="text-gray-300 leading-relaxed">
                  {movie.description}
                </p>
              </div>

              <div className="mt-auto pt-6 border-t border-gray-700">
                <p className="text-gray-500 text-sm">Movie ID: {movie.id}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

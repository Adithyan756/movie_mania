import { Star, Edit, Trash2, Eye } from 'lucide-react';
import type { Movie } from '../App';

type MovieCardProps = {
  movie: Movie;
  onView: () => void;
  onEdit: () => void;
  onDelete: () => void;
};

export function MovieCard({ movie, onView, onEdit, onDelete }: MovieCardProps) {
  return (
    <article className="bg-gray-800 rounded-lg overflow-hidden shadow-lg transition-all hover:shadow-2xl hover:shadow-purple-500/20 hover:-translate-y-1 group">
      {/* Poster Image */}
      <div className="relative aspect-[2/3] overflow-hidden bg-gray-900">
        <img
          src={movie.poster_url}
          alt={movie.title}
          className="w-full h-full object-cover transition-transform group-hover:scale-105"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
        
        {/* Quick Actions Overlay */}
        <div className="absolute inset-0 flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
          <button
            onClick={onView}
            className="bg-purple-600 hover:bg-purple-700 text-white p-3 rounded-full transition-colors"
            title="View Details"
          >
            <Eye className="w-5 h-5" />
          </button>
          <button
            onClick={onEdit}
            className="bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-full transition-colors"
            title="Edit Movie"
          >
            <Edit className="w-5 h-5" />
          </button>
          <button
            onClick={onDelete}
            className="bg-red-600 hover:bg-red-700 text-white p-3 rounded-full transition-colors"
            title="Delete Movie"
          >
            <Trash2 className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Movie Info */}
      <div className="p-4">
        <h3 className="text-white mb-1 line-clamp-1">{movie.title}</h3>
        
        <div className="flex items-center justify-between mb-2">
          <span className="inline-block px-2 py-1 bg-purple-600/20 text-purple-300 rounded text-sm">
            {movie.genre}
          </span>
          <div className="flex items-center gap-1">
            <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
            <span className="text-yellow-400">{movie.rating}</span>
          </div>
        </div>

        <p className="text-gray-400 text-sm line-clamp-2">
          {movie.description}
        </p>
      </div>
    </article>
  );
}

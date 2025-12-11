import { Home, PlusCircle, MessageSquare } from 'lucide-react';

type NavigationProps = {
  currentPage: 'home' | 'add' | 'reviews';
  onNavigate: (page: 'home' | 'add' | 'reviews') => void;
};

export function Navigation({ currentPage, onNavigate }: NavigationProps) {
  return (
    <nav className="bg-gray-900 border-b border-gray-800 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-gradient-to-br from-red-600 to-purple-600 rounded-lg flex items-center justify-center">
              <span className="text-white">🎬</span>
            </div>
            <h1 className="text-white text-xl">MovieMania</h1>
          </div>
          
          <div className="flex gap-2">
            <button
              onClick={() => onNavigate('home')}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${
                currentPage === 'home'
                  ? 'bg-red-600 text-white'
                  : 'text-gray-300 hover:bg-gray-800 hover:text-white'
              }`}
            >
              <Home className="w-5 h-5" />
              <span className="hidden sm:inline">Home</span>
            </button>
            
            <button
              onClick={() => onNavigate('add')}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${
                currentPage === 'add'
                  ? 'bg-red-600 text-white'
                  : 'text-gray-300 hover:bg-gray-800 hover:text-white'
              }`}
            >
              <PlusCircle className="w-5 h-5" />
              <span className="hidden sm:inline">Add Movie</span>
            </button>
            
            <button
              onClick={() => onNavigate('reviews')}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${
                currentPage === 'reviews'
                  ? 'bg-red-600 text-white'
                  : 'text-gray-300 hover:bg-gray-800 hover:text-white'
              }`}
            >
              <MessageSquare className="w-5 h-5" />
              <span className="hidden sm:inline">Reviews</span>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}

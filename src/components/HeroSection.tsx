export function HeroSection() {
  return (
    <section className="relative bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 overflow-hidden">
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=1920')] opacity-20 bg-cover bg-center" />
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
        <div className="text-center">
          <h2 className="text-4xl sm:text-5xl lg:text-6xl text-white mb-4">
            MovieMania
          </h2>
          <p className="text-xl sm:text-2xl text-purple-200 mb-8">
            Dive into Cinematic Worlds
          </p>
          <p className="text-gray-300 max-w-2xl mx-auto">
            Discover, explore, and manage your favorite movies. Your personal cinema database 
            at your fingertips.
          </p>
        </div>
        
        {/* Featured Movie Carousel */}
        <div className="mt-12 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
          {[
            'https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=300',
            'https://images.unsplash.com/photo-1485095329183-d0797cdc5676?w=300',
            'https://images.unsplash.com/photo-1509347528160-9a9e33742cdb?w=300',
            'https://images.unsplash.com/photo-1598899134739-24c46f58b8c0?w=300',
            'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=300'
          ].map((url, i) => (
            <div 
              key={i} 
              className="aspect-[2/3] rounded-lg overflow-hidden shadow-2xl transform transition-transform hover:scale-105 hover:shadow-purple-500/50"
            >
              <img 
                src={url} 
                alt={`Featured ${i + 1}`} 
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

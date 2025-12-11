import { useState, useEffect } from "react";
import {
  MessageSquare,
  MapPin,
  Send,
  CheckCircle,
} from "lucide-react";

type Review = {
  id: number;
  userName: string;
  email: string;
  movieTitle: string;
  rating: string;
  timestamp: string;
};

export function ReviewsPage() {
  const [formData, setFormData] = useState({
    userName: "",
    email: "",
    movieTitle: "",
    rating: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>(
    {},
  );
  const [location, setLocation] = useState<{
    latitude: number;
    longitude: number;
  } | null>(null);
  const [locationError, setLocationError] =
    useState<string>("");
  const [reviews, setReviews] = useState<Review[]>([]);
  const [submitted, setSubmitted] = useState(false);

  // Get user's geolocation on component mount
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          });
        },
        (error) => {
          setLocationError(
            "Location access denied. Enable location permissions to suggest local theaters.",
          );
        },
      );
    } else {
      setLocationError(
        "Geolocation is not supported by your browser.",
      );
    }
  }, []);

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    // User Name validation
    if (!formData.userName.trim()) {
      newErrors.userName = "Name is required";
    }

    // Email validation
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)
    ) {
      newErrors.email = "Please enter a valid email address";
    }

    // Movie Title validation
    if (!formData.movieTitle.trim()) {
      newErrors.movieTitle = "Movie title is required";
    }

    // Rating validation
    if (!formData.rating) {
      newErrors.rating = "Rating is required";
    } else {
      const ratingNum = parseInt(formData.rating);
      if (isNaN(ratingNum) || ratingNum < 1 || ratingNum > 10) {
        newErrors.rating = "Rating must be between 1 and 10";
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

    const review: Review = {
      id: Date.now(),
      userName: formData.userName.trim(),
      email: formData.email.trim(),
      movieTitle: formData.movieTitle.trim(),
      rating: formData.rating,
      timestamp: new Date().toLocaleString(),
    };

    // Log to console as per requirements
    console.log("Review Submitted:", review);
    console.log("User Location:", location);

    // Add to reviews list
    setReviews([review, ...reviews]);

    // Show success message
    setSubmitted(true);

    // Reset form
    setFormData({
      userName: "",
      email: "",
      movieTitle: "",
      rating: "",
    });
    setErrors({});

    // Hide success message after 3 seconds
    setTimeout(() => setSubmitted(false), 3000);
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-gradient-to-br from-gray-900 via-purple-900/20 to-gray-900">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Review Form */}
          <div className="bg-gray-800 rounded-xl shadow-2xl p-6 sm:p-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-purple-600 rounded-lg flex items-center justify-center">
                <MessageSquare className="w-6 h-6 text-white" />
              </div>
              <h2 className="text-white text-2xl">
                Submit a Review
              </h2>
            </div>

            {/* Geolocation Display */}
            <div className="mb-6 p-4 bg-gray-900 rounded-lg border border-gray-700">
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-purple-400 mt-0.5" />
                <div className="flex-1">
                  <p className="text-gray-300 mb-1">
                    Your Location
                  </p>
                  {location ? (
                    <div className="text-sm text-gray-400">
                      <p>
                        Latitude: {location.latitude.toFixed(6)}
                      </p>
                      <p>
                        Longitude:{" "}
                        {location.longitude.toFixed(6)}
                      </p>
                      <p className="text-purple-300 mt-1">
                        📍 Local theater suggestions available
                        in your area
                      </p>
                    </div>
                  ) : (
                    <p className="text-sm text-gray-500">
                      {locationError || "Detecting location..."}
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* Success Message */}
            {submitted && (
              <div className="mb-6 p-4 bg-green-600/20 border border-green-500 rounded-lg flex items-center gap-3">
                <CheckCircle className="w-5 h-5 text-green-400" />
                <p className="text-green-300">
                  Review submitted successfully!
                </p>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* User Name */}
              <div>
                <label
                  htmlFor="userName"
                  className="block text-gray-300 mb-2"
                >
                  Your Name *
                </label>
                <input
                  id="userName"
                  type="text"
                  value={formData.userName}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      userName: e.target.value,
                    })
                  }
                  className={`w-full px-4 py-3 bg-gray-900 border ${
                    errors.userName
                      ? "border-red-500"
                      : "border-gray-700"
                  } rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent`}
                  placeholder="John Doe"
                />
                {errors.userName && (
                  <p className="text-red-400 text-sm mt-1">
                    {errors.userName}
                  </p>
                )}
              </div>

              {/* Email */}
              <div>
                <label
                  htmlFor="email"
                  className="block text-gray-300 mb-2"
                >
                  Email *
                </label>
                <input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      email: e.target.value,
                    })
                  }
                  className={`w-full px-4 py-3 bg-gray-900 border ${
                    errors.email
                      ? "border-red-500"
                      : "border-gray-700"
                  } rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent`}
                  placeholder="john@example.com"
                />
                {errors.email && (
                  <p className="text-red-400 text-sm mt-1">
                    {errors.email}
                  </p>
                )}
              </div>

              {/* Movie Title */}
              <div>
                <label
                  htmlFor="movieTitle"
                  className="block text-gray-300 mb-2"
                >
                  Movie Title Reviewed *
                </label>
                <input
                  id="movieTitle"
                  type="text"
                  value={formData.movieTitle}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      movieTitle: e.target.value,
                    })
                  }
                  className={`w-full px-4 py-3 bg-gray-900 border ${
                    errors.movieTitle
                      ? "border-red-500"
                      : "border-gray-700"
                  } rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent`}
                  placeholder="e.g., Inception"
                />
                {errors.movieTitle && (
                  <p className="text-red-400 text-sm mt-1">
                    {errors.movieTitle}
                  </p>
                )}
              </div>

              {/* Rating */}
              <div>
                <label
                  htmlFor="reviewRating"
                  className="block text-gray-300 mb-2"
                >
                  Rating (1-10) *
                </label>
                <input
                  id="reviewRating"
                  type="number"
                  min="1"
                  max="10"
                  value={formData.rating}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      rating: e.target.value,
                    })
                  }
                  className={`w-full px-4 py-3 bg-gray-900 border ${
                    errors.rating
                      ? "border-red-500"
                      : "border-gray-700"
                  } rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent`}
                  placeholder="8"
                />
                {errors.rating && (
                  <p className="text-red-400 text-sm mt-1">
                    {errors.rating}
                  </p>
                )}
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-colors"
              >
                <Send className="w-5 h-5" />
                Submit Review
              </button>
            </form>
          </div>

          {/* Recent Reviews */}
          <div className="bg-gray-800 rounded-xl shadow-2xl p-6 sm:p-8">
            <h3 className="text-white text-xl mb-6">
              Recent Reviews
            </h3>

            {reviews.length === 0 ? (
              <div className="text-center py-12">
                <MessageSquare className="w-12 h-12 text-gray-600 mx-auto mb-3" />
                <p className="text-gray-400">No reviews yet</p>
                <p className="text-gray-500 text-sm mt-1">
                  Be the first to submit a review!
                </p>
              </div>
            ) : (
              <div className="space-y-4 max-h-[600px] overflow-y-auto">
                {reviews.map((review) => (
                  <div
                    key={review.id}
                    className="p-4 bg-gray-900 rounded-lg border border-gray-700"
                  >
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <p className="text-white">
                          {review.userName}
                        </p>
                        <p className="text-gray-500 text-sm">
                          {review.email}
                        </p>
                      </div>
                      <div className="flex items-center gap-1 bg-purple-600/20 px-2 py-1 rounded">
                        <span className="text-purple-300">
                          {review.rating}/10
                        </span>
                      </div>
                    </div>
                    <p className="text-gray-300 mb-2">
                      {review.movieTitle}
                    </p>
                    <p className="text-gray-500 text-sm">
                      {review.timestamp}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
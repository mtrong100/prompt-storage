import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="min-h-screen bg-gray-900 flex flex-col items-center justify-center p-4">
      <h1 className="text-4xl font-bold text-red-500 mb-4">404</h1>
      <p className="text-xl text-gray-300 mb-6">Page not found</p>
      <Link
        to="/"
        className="px-6 py-2 bg-cyan-600 text-white rounded-md hover:bg-cyan-500 transition-colors"
      >
        Go to Home
      </Link>
    </div>
  );
};

export default NotFound;

import { useState } from "react";
import { Link } from "react-router-dom";
import { usePosts } from "../hooks/usePosts";
import { useAuth } from "../context/AuthContext";
import PostCard from "../components/PostCard";
import SearchFilter from "../components/SearchFilter";
import toast from "react-hot-toast";

const PostCardSkeleton = () => (
  <div className="bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-700 animate-pulse">
    <div className="h-6 w-3/4 bg-gray-700 rounded mb-4"></div>
    <div className="space-y-2 mb-5">
      {Array.from({ length: 22 }).map((_, i) => (
        <div key={i} className="h-5 bg-gray-700 rounded w-full"></div>
      ))}
    </div>

    <div className="flex justify-between items-center pt-3 border-t border-gray-700">
      <div className="h-8 w-24 bg-gray-700 rounded-lg"></div>
      <div className="flex space-x-2">
        <div className="h-10 w-10 bg-gray-700 rounded-lg"></div>
        <div className="h-10 w-10 bg-gray-700 rounded-lg"></div>
      </div>
    </div>
  </div>
);

const Home = () => {
  const { posts, loading, deletePost } = usePosts();
  const { currentUser } = useAuth();
  const [searchTerm, setSearchTerm] = useState("");

  const filteredPosts = posts.filter(
    (post) =>
      post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this post?")) {
      await deletePost(id);
      toast.success("Post deleted successfully");
    }
  };

  return (
    <div className="mt-5">
      <SearchFilter value={searchTerm} onChange={setSearchTerm} />

      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[...Array(10)].map((_, i) => (
            <PostCardSkeleton key={i} />
          ))}
        </div>
      ) : filteredPosts.length === 0 ? (
        <div className="text-center py-12 bg-gray-800/50 rounded-xl border border-gray-700">
          <p className="text-gray-400 text-lg">
            {searchTerm ? "No posts match your search" : "No posts available"}
          </p>
          {currentUser && (
            <Link
              to="/create"
              className="mt-4 inline-flex items-center px-4 py-2 bg-cyan-600 hover:bg-cyan-500 text-white rounded-lg transition-colors duration-200"
            >
              Create your first post
            </Link>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredPosts.map((post) => (
            <PostCard
              key={post.id}
              post={post}
              onDelete={handleDelete}
              currentUser={currentUser}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Home;

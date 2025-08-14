import { Pencil, Trash2, Copy, Check } from "lucide-react";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import { useState } from "react";

const PostCard = ({ post, onDelete, currentUser }) => {
  const [isCopied, setIsCopied] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(post.description).then(() => {
      setIsCopied(true);
      toast.success("Post ID copied to clipboard!");
    });
  };

  return (
    <div
      className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl p-6 shadow-lg transition-all duration-300 flex flex-col border border-gray-700 hover:border-cyan-400/20 hover:shadow-xl"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="flex-1">
        <h3 className="text-xl capitalize md:text-2xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent mb-3">
          {post.title}
        </h3>

        <p className="prose max-w-none mb-5 text-gray-300 whitespace-pre-wrap">
          {post.description}
        </p>
      </div>

      <div className="flex justify-between items-center pt-3 border-t border-gray-700">
        <button
          onClick={handleCopy}
          className="flex items-center p-5 bg-gray-700/50 hover:bg-gray-600 rounded-lg transition-all duration-300 text-sm font-medium text-gray-200 hover:scale-105"
          disabled={isCopied}
        >
          {isCopied ? (
            <>
              <Check size={16} className="mr-2 text-green-400" />
              Copied!
            </>
          ) : (
            <>
              <Copy size={16} className="mr-2" />
              Copy
            </>
          )}
        </button>

        {currentUser && (
          <div
            className={`flex space-x-2 ${
              isHovered ? "opacity-100" : "opacity-80"
            } transition-opacity duration-300`}
          >
            <Link
              to={`/edit/${post.id}`}
              className="p-5 rounded-lg bg-gray-700/50 hover:bg-gray-600 transition-all duration-300 text-cyan-400 hover:rotate-6"
              aria-label="Edit post"
            >
              <Pencil size={18} />
            </Link>
            <button
              onClick={() => onDelete(post.id)}
              className="p-5 rounded-lg bg-gray-700/50 hover:bg-gray-600 transition-all duration-300 text-red-400 hover:rotate-6"
              aria-label="Delete post"
            >
              <Trash2 size={18} />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default PostCard;

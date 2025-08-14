import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../config/firebase";
import { useAuth } from "../context/AuthContext";
import { usePosts } from "../hooks/usePosts";
import toast from "react-hot-toast";
import { X, Loader2, Save, ChevronLeft } from "lucide-react";

const EditPost = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  const { updatePost } = usePosts();

  const [post, setPost] = useState({ title: "", description: "" });
  const [isFetching, setIsFetching] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const docSnap = await getDoc(doc(db, "posts", id));
        if (!docSnap.exists()) {
          toast.error("Post not found");
          return navigate("/");
        }
        const data = docSnap.data();
        setPost({
          id: docSnap.id,
          title: data.title || "",
          description: data.description || "",
        });
      } catch (error) {
        console.error(error);
        toast.error("Failed to load post");
        navigate("/");
      } finally {
        setIsFetching(false);
      }
    };

    fetchPost();
  }, [id, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!currentUser) {
      return toast.error("You need to be logged in to edit a post");
    }

    setIsSubmitting(true);
    try {
      await updatePost(id, {
        title: post.title.trim(),
        description: post.description.trim(),
      });
      navigate("/");
    } catch (error) {
      console.error(error);
      toast.error("Failed to update post");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isFetching) {
    return (
      <div className="min-h-screen flex items-center justify-center text-white">
        <Loader2 className="animate-spin mr-2 text-cyan-400" size={24} />
        <span className="text-gray-300">Loading post...</span>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      <button
        onClick={() => navigate(-1)}
        className="flex items-center text-gray-400 hover:text-cyan-400 transition-colors mb-6"
      >
        <ChevronLeft size={20} className="mr-1" />
        Back
      </button>

      <form
        onSubmit={handleSubmit}
        className="space-y-6 bg-gray-800/50 rounded-xl p-6 border border-gray-700 shadow-lg"
      >
        <h2 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">
          Edit Post
        </h2>

        <div className="space-y-4">
          {/* Title */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Title
            </label>
            <input
              type="text"
              value={post.title}
              onChange={(e) => setPost({ ...post, title: e.target.value })}
              className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 text-gray-200 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all"
              required
              disabled={isSubmitting}
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Content
            </label>
            <textarea
              value={post.description}
              onChange={(e) =>
                setPost({ ...post, description: e.target.value })
              }
              className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 text-gray-200 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all placeholder-gray-400 min-h-[500px]"
              placeholder="Write something here..."
              required
              disabled={isSubmitting}
            />
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-end space-x-3 pt-4">
          <button
            type="button"
            onClick={() => navigate("/")}
            className="flex items-center px-5 py-2.5 bg-gray-700 hover:bg-gray-600 text-gray-200 rounded-lg transition-all duration-200 hover:shadow-md disabled:opacity-50"
            disabled={isSubmitting}
          >
            <X size={18} className="mr-2" />
            Cancel
          </button>
          <button
            type="submit"
            className="flex items-center px-5 py-2.5 bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white rounded-lg transition-all duration-200 hover:shadow-md disabled:opacity-50 min-w-[120px] justify-center"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <>
                <Loader2 size={18} className="mr-2 animate-spin" />
                Saving...
              </>
            ) : (
              <>
                <Save size={18} className="mr-2" />
                Save Changes
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditPost;

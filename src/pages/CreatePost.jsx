import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { usePosts } from "../hooks/usePosts";
import toast from "react-hot-toast";
import { X, Loader2, Save, ChevronLeft } from "lucide-react";
import ReactQuill from "react-quill-new";
import "react-quill-new/dist/quill.snow.css";

const CreatePost = () => {
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  const { addPost } = usePosts();

  const [post, setPost] = useState({ title: "", description: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const modules = {
    toolbar: [
      [{ header: [1, 2, 3, false] }],
      ["bold", "italic", "underline", "strike"],
      [{ list: "ordered" }, { list: "bullet" }],
      ["link", "image"],
      ["clean"],
    ],
  };

  const formats = [
    "header",
    "bold",
    "italic",
    "underline",
    "strike",
    "list",
    "link",
    "image",
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!currentUser) {
      return toast.error("You need to be logged in to create a post");
    }

    setIsSubmitting(true);
    try {
      await addPost({
        title: post.title.trim(),
        description: post.description.trim(),
        authorId: currentUser.uid,
        authorName: currentUser.displayName || currentUser.email,
      });
    } catch (error) {
      console.error(error);
      toast.error("Failed to create post");
    } finally {
      setIsSubmitting(false);
      window.location.reload();
    }
  };

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
          Create New Post
        </h2>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Title
            </label>
            <input
              type="text"
              value={post.title}
              onChange={(e) => setPost({ ...post, title: e.target.value })}
              className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 text-gray-200 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all placeholder-gray-400"
              placeholder="Enter post title"
              required
              disabled={isSubmitting}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Content
            </label>
            <div>
              <ReactQuill
                theme="snow"
                value={post.description}
                onChange={(value) => setPost({ ...post, description: value })}
                modules={modules}
                formats={formats}
                readOnly={isSubmitting}
                className="my-4 dark:border-secondary-40 border-gray-500 rounded-md text-gray-800 dark:text-white text-lg"
                placeholder={"Write something here..."}
              />
            </div>
          </div>
        </div>

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
                Creating...
              </>
            ) : (
              <>
                <Save size={18} className="mr-2" />
                Create Post
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreatePost;

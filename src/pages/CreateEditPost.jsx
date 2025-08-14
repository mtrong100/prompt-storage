import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../config/firebase";
import PostForm from "../components/PostForm";
import { usePosts } from "../hooks/usePosts";
import toast from "react-hot-toast";

const CreateEditPost = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addPost, updatePost } = usePosts();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(!!id);

  useEffect(() => {
    if (id) {
      const fetchPost = async () => {
        try {
          const docRef = doc(db, "posts", id);
          const docSnap = await getDoc(docRef);
          if (docSnap.exists()) {
            setPost(docSnap.data());
          } else {
            toast.error("Post not found");
            navigate("/");
          }
        } catch (error) {
          toast.error("Error loading post");
          console.error(error);
          navigate("/");
        } finally {
          setLoading(false);
        }
      };
      fetchPost();
    }
  }, [id, navigate]);

  const handleSubmit = async (postData) => {
    try {
      if (id) {
        await updatePost(id, postData);
      } else {
        await addPost(postData);
      }
      navigate("/");
    } catch (error) {
      toast.error(`Error ${id ? "updating" : "creating"} post`);
      console.error(error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 py-8">
      <PostForm
        initialValues={post || {}}
        onSubmit={handleSubmit}
        isEditing={!!id}
        isLoading={loading}
      />
    </div>
  );
};

export default CreateEditPost;

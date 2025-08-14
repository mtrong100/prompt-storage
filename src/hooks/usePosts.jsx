import { useState, useEffect } from "react";
import { postsCollection } from "../config/firebase";
import {
  addDoc,
  deleteDoc,
  doc,
  onSnapshot,
  updateDoc,
} from "firebase/firestore";
import toast from "react-hot-toast";

export const usePosts = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onSnapshot(postsCollection, (snapshot) => {
      const postsData = [];
      snapshot.forEach((doc) => {
        postsData.push({ id: doc.id, ...doc.data() });
      });

      // Sắp xếp theo title A - Z
      postsData.sort((a, b) =>
        a.title.localeCompare(b.title, "en", { sensitivity: "base" })
      );

      setPosts(postsData);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const addPost = async (post) => {
    try {
      await addDoc(postsCollection, {
        ...post,
        createdAt: new Date(),
      });
      toast.success("Post added successfully!");
    } catch (error) {
      toast.error("Error adding post");
      console.error(error);
    }
  };

  const updatePost = async (id, post) => {
    try {
      await updateDoc(doc(postsCollection, id), post);
      toast.success("Post updated successfully!");
    } catch (error) {
      toast.error("Error updating post");
      console.error(error);
    }
  };

  const deletePost = async (id) => {
    try {
      await deleteDoc(doc(postsCollection, id));
      toast.success("Post deleted successfully!");
    } catch (error) {
      toast.error("Error deleting post");
      console.error(error);
    }
  };

  return { posts, loading, addPost, updatePost, deletePost };
};

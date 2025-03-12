import { useEffect, useState } from "react";
import { getAllPosts } from "../../managers/PostManager";
import { getAllCategories } from "../../managers/CategoryManager";
import { getPostsByUserId } from "../../managers/PostServices";
import { getAllUsers } from "../../managers/UserManager";
import "../../Rare.css";
import Post from "./Post";
import PostFilters from "./PostFilters";

export const PostList = ({ token }) => {
  const [posts, setPosts] = useState([]);

  const [filteredPosts, setFilteredPosts] = useState(posts);

  const [categories, setCategories] = useState([]);

  const [users, setUsers] = useState([]);

  const getAndSetPosts = () => {
    if (token) {
      getPostsByUserId(token).then((postArray) => setPosts(postArray));
      return;
    }
    getAllPosts().then((postsArray) => {
      setPosts(postsArray);
    });
  };

  useEffect(() => {
    getAllCategories().then((categoriesArray) => {
      setCategories(categoriesArray);
    });

    getAllUsers().then((usersArray) => {
      setUsers(usersArray);
    });
  }, []);

  useEffect(() => {
    getAndSetPosts();
  }, [token]);

  return (
    <div key="container">
      <PostFilters
        categories={categories}
        token={token}
        users={users}
        posts={posts}
        setFilteredPosts={setFilteredPosts}
      />

      {filteredPosts.map((post) => (
        <Post
          key={post.id}
          post={post}
          categories={categories}
          users={users}
          token={token}
          getAndSetPosts={getAndSetPosts}
        />
      ))}
    </div>
  );
};

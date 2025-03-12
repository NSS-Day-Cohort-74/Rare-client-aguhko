import { useEffect, useState } from "react";
import { getAllPosts } from "../../managers/PostManager";
import { getAllCategories } from "../../managers/CategoryManager";
import { getPostsByUserId } from "../../managers/PostServices";
import { getAllUsers } from "../../managers/UserManager";
import "../../Rare.css";
import Post from "./Post";

export const PostList = ({ token }) => {
  const [posts, setPosts] = useState([]);

  const [filteredPosts, setFilteredPosts] = useState(posts);

  const [categories, setCategories] = useState([]);

  const [users, setUsers] = useState([]);

  const [filters, setFilters] = useState({
    title: "",
    category: "default",
    author: "default",
  });

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
    const filterHandler = () => {
      let filtered = posts;

      if (filters.title !== "") {
        filtered = filtered.filter((post) =>
          post.title.toLowerCase().includes(filters.title.toLowerCase()),
        );
      }
      if (filters.category !== "default") {
        filtered = filtered.filter(
          (post) => post.category_id === parseInt(filters.category),
        );
      }
      if (filters.author !== "default") {
        filtered = filtered.filter(
          (post) => post.user_id === parseInt(filters.author),
        );
      }
      setFilteredPosts(filtered);
    };
    filterHandler();
  }, [filters.title, filters.category, filters.author]);

  useEffect(() => {
    getAndSetPosts();
  }, [token]);

  return (
    <div key="container">
      <div className="mx-3 mb-2">
        <input
          type="text"
          placeholder="Filter by title..."
          value={filters.title}
          onChange={({ target: { value } }) => {
            setFilters({ ...filters, title: value.trim() });
          }}
          className="input"
        />
      </div>
      <div className="columns mx-3 mt-2">
        <div>
          <select
            className="ml-3 select"
            onChange={({ target: { value } }) => {
              setFilters({ ...filters, category: value });
            }}
          >
            <option key="0" value="default">
              All Categories...
            </option>
            {categories.map((category) => {
              return (
                <option key={category.id} value={category.id}>
                  {category.label}
                </option>
              );
            })}
          </select>
        </div>
        <div>
          <select
            className="ml-3 select"
            onChange={({ target: { value } }) => {
              setFilters({ ...filters, author: value });
            }}
          >
            <option key="0" value="default">
              All Authors...
            </option>
            {users.map((user) => {
              return (
                <option key={user.id} value={user.id}>
                  {user.first_name} {user.last_name}
                </option>
              );
            })}
          </select>
        </div>
      </div>

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

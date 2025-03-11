import { useEffect, useState } from "react";
import { getAllPosts } from "../../managers/PostManager";
import { getAllCategories } from "../../managers/CategoryManager";
import { deletePost, getPostsByUserId } from "../../managers/PostServices";
import { getAllUsers } from "../../managers/UserManager";
import { HumanDate } from "../utils/HumanDate";
import { Link } from "react-router-dom";
import "../../Rare.css";

export const PostList = ({ token }) => {
  const [posts, setPosts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [users, setUsers] = useState([]);
  const [filterCategory, setFilteredCategory] = useState(posts);

  const getAndSetPosts = () => {
    getAllPosts().then((postsArray) => {
      setPosts(postsArray);
    });
    getAllCategories().then((categoriesArray) => {
      setCategories(categoriesArray);
    });

    getAllUsers().then((usersArray) => {
      setUsers(usersArray);
    });

    if (token) {
      getPostsByUserId(token).then((postArray) => setPosts(postArray));
    }
  };

  useEffect(() => {
    getAndSetPosts()
  }, [token])

  useEffect(() => {
    setFilteredCategory(posts);
  }, [posts]);

  const handleDeletePost = (event) => {
    event.preventDefault();
    const deleteConfirmation = window.confirm(
      "Are you sure that you want to delete this post?"
    );
    if (deleteConfirmation) {
      deletePost(parseInt(event.target.id)).then(getAndSetPosts);
    } else {
      window.alert("Your post was not deleted!");
    }
  };

  const handleEditPost = (event) => {
    console.log("Navigating to post editing!");
  };

  const handleFormChange = (event) => {
    if (event.target.value === "default") {
      setFilteredCategory(posts);
    } else {
      let filteredPost = posts.filter(
        (post) => post.category_id === parseInt(event.target.value)
      );
      setFilteredCategory(filteredPost);
    }
  };

  return (
    <div key="container">
      <select className="ml-3 control" onChange={handleFormChange}>
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

      {filterCategory.map((post) => {
        let postCategory = categories.find(
          (category) => category.id === post.category_id
        );

        let postUser = users.find((user) => user.id === post.user_id);

        return (
          <div key={post.id}>
            {/* First returns expression: Displays current user's posts at My Posts */}
            {token ? (
              <div className="card mb-3 p-2">
                <div className="title">
                  <Link to={`/posts/${post.id}`}>{post.title}</Link>
                </div>
                <section className="mx-4 level is-size-4">
                  {postCategory ? postCategory.label : ""}
                  <div className="is-size-6">
                    {post.publication_date ? (
                      <HumanDate date={post.publication_date.split("T")[0]} />
                    ) : (
                      "Unknown Date"
                    )}
                  </div>
                </section>
                <footer className="level">
                  <div className="ml-4">
                    {postUser?.first_name || "Unknown Author"}
                  </div>
                  <div className="is-pulled-right">
                    <button
                      className="button is-primary fa-solid fa-edit"
                      id={post.id}
                      onClick={handleEditPost}
                    ></button>
                    <button
                      className="button is-danger fa-solid fa-trash-can"
                      id={post.id}
                      onClick={handleDeletePost}
                    ></button>
                  </div>
                </footer>
              </div>
            ) : (
              <div className="card mb-3 p-2">
                <div className="title">
                  <Link to={`/posts/${post.id}`}>{post.title}</Link>
                </div>
                <section className="mx-4 level is-size-4">
                  {postCategory ? postCategory.label : ""}
                  <div className="is-size-6">
                    {post.publication_date ? (
                      <HumanDate date={post.publication_date.split("T")[0]} />
                    ) : (
                      "Unknown Date"
                    )}
                  </div>
                </section>
                <footer className="level">
                  <div className="ml-4">Author</div>
                  <div>{postUser?.first_name || "Unknown Author"}</div>
                </footer>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

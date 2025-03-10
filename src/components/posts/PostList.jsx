import { useEffect, useState } from "react";
import { getAllPosts, getAllPostTags } from "../../managers/PostManager";
import { getAllCategories } from "../../managers/CategoryManager";
import { getAllTags } from "../../managers/TagManager";
import { getPostsByUserId } from "../../managers/PostServices";

import { HumanDate } from "../utils/HumanDate";
import "../../Rare.css";
export const PostList = ({ token }) => {
  const [posts, setPosts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [tags, setTags] = useState([]);
  const [postTags, setPostTags] = useState([]);
  const [filterCategory, setFilteredCategory] = useState(posts);

  useEffect(() => {
    getAllPosts().then((postsArray) => {
      setPosts(postsArray);
    });
    getAllCategories().then((categoriesArray) => {
      setCategories(categoriesArray);
    });
    getAllTags().then((tagsArray) => {
      setTags(tagsArray);
    });
    getAllPostTags().then((postTagsArray) => {
      setPostTags(postTagsArray);
    });
    if (token) {
      getPostsByUserId(token).then((postArray) => setPosts(postArray));
    }
  }, [token]);

  useEffect(() => {
    setFilteredCategory(posts);
  }, [posts]);

  const handleDeletePost = () => {
    console.log("Post Deleted!");
  };

  const handleEditPost = () => {
    console.log("Navigating to post editing!");
  };

  const handleFormChange = (event) => {
    if (event.target.value === "default") {
      setFilteredCategory(posts);
    } else {
      let filteredPost = posts.filter(
        (post) => post.category_id === parseInt(event.target.value),
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
          (category) => category.id === post.category_id,
        );

        let postTagArr = postTags.filter(
          (postTag) => postTag.post_id === post.id,
        );

        let relatedTags = postTagArr.flatMap((postTag) =>
          tags.filter((tag) => tag.id === postTag.tag_id),
        );

        // Shared component, used for Post List and My Posts components.
        return (
          <div key={post.id}>
            {/* First returns expression. Displays current user's posts at My Posts */}
            {token ? (
              <div className="card mb-3 p-2">
                {/* Second statement returns all posts, there is no token being accepted in this view. */}
                <div className="title">{post.title}</div>
                <section className="mx-4 level is-size-4">
                  {postCategory ? postCategory.label : ""}
                  <div className="is-size-6">
                    {<HumanDate date={post.publication_date.split("T")[0]} />}
                  </div>
                </section>
                <div className="image_container">
                  <img
                    className="image"
                    src={post.image_url}
                    alt="placeholder"
                  />
                </div>
                <footer className="level">
                  <div className="ml-4">Author: {post.full_name}</div>
                  <div>
                    {relatedTags
                      ? relatedTags.map((tag) => tag.label).join(", ")
                      : ""}
                  </div>
                  <div className="is-pulled-right">
                    <button
                      className="button is-primary"
                      onClick={handleEditPost}
                    >
                      <i className="fa-solid fa-edit"></i>
                    </button>
                    <button
                      className="button is-danger"
                      onClick={handleDeletePost}
                    >
                      <i className="fa-solid fa-trash-can"></i>
                    </button>
                  </div>
                </footer>
              </div>
            ) : (
              <div className="card mb-3 p-2">
                {/* Second statement returns all posts, there is no token being accepted in this view. */}
                <div className="title">{post.title}</div>
                <section className="mx-4 level is-size-4">
                  {postCategory ? postCategory.label : ""}
                  <div className="is-size-6">
                    {<HumanDate date={post.publication_date.split("T")[0]} />}
                  </div>
                </section>
                <div className="image_container">
                  <img
                    className="image"
                    src={post.image_url}
                    alt="placeholder"
                  />
                </div>
                <footer className="level">
                  <div className="ml-4">Author: {post.full_name}</div>
                  <div>
                    {relatedTags
                      ? relatedTags.map((tag) => tag.label).join(", ")
                      : ""}
                  </div>
                  <div className="is-pulled-right">
                    <button
                      className="button is-primary"
                      onClick={handleEditPost}
                    >
                      <i className="fa-solid fa-edit"></i>
                    </button>
                    <button
                      className="button is-danger"
                      onClick={handleDeletePost}
                    >
                      <i className="fa-solid fa-trash-can"></i>
                    </button>
                  </div>
                </footer>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

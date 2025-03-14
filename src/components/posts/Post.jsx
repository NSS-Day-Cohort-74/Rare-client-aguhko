import { HumanDate } from "../utils/HumanDate";
import { Link } from "react-router-dom";
import { deletePost } from "../../managers/PostServices";

const Post = ({ post, categories, users, token, getAndSetPosts }) => {
  let postCategory = categories.find(
    (category) => category.id === post.category_id,
  );
  const handleDeletePost = (event) => {
    event.preventDefault();
    const deleteConfirmation = window.confirm(
      "Are you sure that you want to delete this post?",
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
              {post.full_name || "Unknown Author"}
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
            <div>{post.author_name || "Unknown Author"}</div>
          </footer>
        </div>
      )}
    </div>
  );
};

export default Post;

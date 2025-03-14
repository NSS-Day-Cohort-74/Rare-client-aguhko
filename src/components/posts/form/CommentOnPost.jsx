import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { addComment } from "../../../managers/CommentManager";

const CommentOnPost = ({ token }) => {
  const navigate = useNavigate();
  const { postId } = useParams();
  const [newComment, setNewComment] = useState({
    content: "",
    author_id: parseInt(token),
    post_id: parseInt(postId),
  });

  const handleNewComment = (e) => {
    e.preventDefault();

    addComment(newComment).then(() => {
      navigate(`/posts/${postId}/comments`);
    });
  };

  return (
    <div className="container">
      <form onSubmit={handleNewComment}>
        <div className="field is-centered">
          <label className="label">Leave a Comment</label>
          <div className="control m-2">
            <textarea
              className="textarea"
              onChange={({ target: { value } }) => {
                setNewComment({
                  ...newComment,
                  content: value,
                });
              }}
              placeholder="Write your comment here..."
              required
            />
          </div>
        </div>
        <div className="control">
          <button type="submit" className="button is-primary ml-2">
            Comment
          </button>
        </div>
      </form>
    </div>
  );
};

export default CommentOnPost;

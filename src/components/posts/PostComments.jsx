import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { deleteComment, getAllComments } from "../../managers/CommentManager";

export const PostComments = ({ token }) => {
    const { postId } = useParams()
    const [comments, setComments] = useState([])

    useEffect(() => {
        getAllComments().then(commentObj => {
            setComments(commentObj)
        })
    }, [])

    const handleDelete = (commentId) => {
        deleteComment(commentId, token).then(() => {
            setComments(comments.filter((comment) => comment.id !== commentId));
        });
    };

    let relatedComments = comments.filter(comment => comment.post_id === parseInt(postId))
    return (
        <section className="section">
            <div className="container">
                <div className="columns is-centered">
                    <div className="column is-half">
                        <h2 className="title is-4">Comments</h2>

                        {relatedComments.length > 0 ? (
                            relatedComments.map((comment) => (
                                <article key={comment.comment_id} className="box" style={{ position: "relative", padding: "1.5rem" }}>
                                    {/* Delete Button (Top-Right) */}
                                    {comment.author_id === parseInt(token) && (
                                        <button
                                            className="button is-danger is-small"
                                            style={{
                                                position: "absolute",
                                                top: "10px",
                                                right: "10px"
                                            }}
                                            onClick={() => handleDelete(comment.id)}
                                        >
                                            ✕
                                        </button>
                                    )}

                                    {/* Comment Content */}
                                    <div className="content">
                                        <p>
                                            <strong>{comment.author_name}</strong>
                                            <br />
                                            {comment.content}
                                        </p>
                                    </div>
                                </article>
                            ))
                        ) : (
                            <p>No comments yet</p>
                        )}
                    </div>
                </div>
            </div>
        </section>
    )




}
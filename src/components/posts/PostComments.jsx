import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getAllComments } from "../../managers/CommentManager";

export const PostComments = () => {
    const { postId } = useParams()
    const [comments, setComments] = useState([])

    useEffect(() => {
        getAllComments().then(commentObj => {
            setComments(commentObj)
        })

        
    }, [])
        let relatedComments = comments.filter(comment => comment.post_id === parseInt(postId))
        return (
            <section className="section">
              <div className="container">
                <div className="columns is-centered">
                  <div className="column is-half">
                    <h2 className="title is-4">Comments</h2>
                    
                    {relatedComments.length > 0 ? (
                      relatedComments.map((comment) => (
                        <article key={comment.comment_id} className="box ">
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
                      <p>No comments yet.</p>
                    )}
                  </div>
                </div>
              </div>
            </section>
          )
          
          
      

}
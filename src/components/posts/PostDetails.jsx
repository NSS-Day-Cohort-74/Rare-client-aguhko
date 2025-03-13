import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getPostsByPostId } from "../../managers/PostServices";

export const PostDetails = ({ token }) => {
  const { postId } = useParams();

  const [post, setPost] = useState({});

  useEffect(() => {
    getPostsByPostId(parseInt(postId)).then((postObj) => {
      setPost(postObj);
    });
  }, [token, postId]);

  return (
    <section className="section">
      <div className="container">
        <div>{post?.category_name}</div>
        <div>{post?.publication_date}</div>
        <div className="columns is-centered">
          <div className="column is-half">
            <h1 className="title is-2 has-text-centered">{post?.title}</h1>
            <figure className="image is-16by9">
              <img src={post?.image_url} alt="" />
            </figure>
          </div>
        </div>
        <div className="columns is-centered">
          <div className="column is-half has-text-centered">
            <h2 className="content is-size-5 has-text-left title ">
              By {post?.full_name}
            </h2>
            <p className="content is-size-5">{post?.post_content}</p>
            <div>
              {post.tags
                ? post.tags.map((tag) => (
                    <span className="tag is-warning m-2">{tag}</span>
                  ))
                : ""}
            </div>
            <div>
              <Link to={`/posts/${postId}/comments`}>
                <button className="button">View Comments</button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

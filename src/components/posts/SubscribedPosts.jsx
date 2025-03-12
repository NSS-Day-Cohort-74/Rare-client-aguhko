import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { HumanDate } from "../utils/HumanDate";
import { getSubscribedPosts } from "../../managers/PostServices";

const SubscribedPosts = ({ token }) => {
  const [posts, setPosts] = useState([]);

useEffect(() => {
  getSubscribedPosts(token).then((subscribedPostsArray) => setPosts(subscribedPostsArray))
}, [token])

  return (
    <div>
      {posts.length > 0 ? (
        posts.map((post) => (
          <div key={post.id} className="card mb-3 p-2">
            <div className="title">
              <Link to={`/posts/${post.id}`}>{post.title}</Link>
            </div>
            <section className="mx-4 level is-size-4">
              {post.category_label}
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
              <div>{post.author_name}</div>
            </footer>
          </div>
        ))
      ) : (
        <div className="card p-6">
          <strong>Subscribe to authors to curate your personal homepage</strong>
        </div>
      )}
    </div>
  );
};

export default SubscribedPosts;

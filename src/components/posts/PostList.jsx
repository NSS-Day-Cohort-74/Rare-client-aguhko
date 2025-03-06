import { useEffect, useState } from "react";
import { getAllPosts, getAllPostTags } from "../../managers/PostManager";
import { getAllCategories } from "../../managers/CategoryManager";
import { getAllTags } from "../../managers/TagManager";
import { HumanDate } from "../utils/HumanDate";
import { Link } from "react-router-dom";

export const PostList = () => {
  const [posts, setPosts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [tags, setTags] = useState([]);
  const [postTags, setPostTags] = useState([]);

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
  }, []);

  return (
    <div className="container">
      {posts.map((post) => {
        let postCategory = categories.find(
          (category) => category.id === post.category_id,
        );

        let postTagArr = postTags.filter(
          (postTag) => postTag.post_id === post.id,
        );

        let relatedTags = postTagArr.flatMap((postTag) =>
          tags.filter((tag) => tag.id === postTag.tag_id),
        );
        console.log(relatedTags.map((tag) => tag.label));

        return (
          <div key={post.id} className="box">
            <Link to={`/posts/${post.id}`}>
              <div>
                <div className="title">{post.title}</div>
                <div>Author</div>
                <div>Date</div>
                <div>{HumanDate(post.publication_date.split("T")[0])}</div>
                <div>Category</div>
                <div>{postCategory ? postCategory.label : ""}</div>
              </div>
            </Link>
          </div>
        );
      })}
    </div>
  );
};

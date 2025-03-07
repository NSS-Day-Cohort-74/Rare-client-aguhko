<<<<<<< HEAD
<<<<<<< HEAD
import { useEffect, useState } from "react"
import { getAllPosts, getAllPostTags } from "../../managers/PostManager"
import { getAllCategories } from "../../managers/CategoryManager"
import { getAllTags } from "../../managers/TagManager"
import { getPostsByUserId } from "../../managers/PostServices"


export const PostList = ({token}) => {
    const [posts, setPosts] = useState([])
    const [categories, setCategories] = useState([])
    const [tags, setTags] = useState([])
    const [postTags, setPostTags] = useState([])
    const [testing, setTesting] = useState([])

    useEffect(() => {
        if (token) {
            getPostsByUserId(token).then((postArray) => setPosts(postArray))
        }
        else {
            getAllPosts().then(postsArray => {
                setPosts(postsArray)
            })
            getAllCategories().then(categoriesArray => {
                setCategories(categoriesArray)
            })
            getAllTags().then(tagsArray => {
                setTags(tagsArray)
            })
            getAllPostTags().then(postTagsArray => {
                setPostTags(postTagsArray)
            })
        }
    }, [token])

    const handleDeletePost = (event) => {
        console.log("Post Deleted!")
    }

    const handleEditPost = (event) => {
        console.log("Navigating to post editing!")
    }
    return (
        <div>
            {posts.map((post) => {

                let postCategory = categories.find(category => category.id === post.category_id)

                let postTagArr = postTags.filter(postTag => postTag.post_id === post.id)
                
                let relatedTags = postTagArr.flatMap(postTag =>
                    tags.filter(tag => tag.id === postTag.tag_id)
                );
                console.log(relatedTags.map(tag => tag.label))

                return (
                    <>
                    {token 
                    ? <div key={post.id}>
                        <div>
                            <div>Title</div>
                            <div>{post.title}</div>
                            <div>Author</div>
                            <div>Date</div>
                            <div>{post.publication_date}</div>
                            <div>Category</div>
                            <div>{postCategory ? postCategory.label : ""}</div>
                            <div>Tags</div>
                            <div>{ relatedTags ? relatedTags.map(tag => tag.label).join(", ") : ""}</div>
                        </div>
                        <button onClick={handleDeletePost}>Delete</button>
                        <button onClick={handleEditPost}>Edit</button>
                    </div>
                    : <div key={post.id}>
                        <div>
                            <div>Title</div>
                            <div>{post.title}</div>
                            <div>Author</div>
                            <div>Date</div>
                            <div>{post.publication_date}</div>
                            <div>Category</div>
                            <div>{postCategory ? postCategory.label : ""}</div>
                            <div>Tags</div>
                            <div>{ relatedTags ? relatedTags.map(tag => tag.label).join(", ") : ""}</div>
                        </div>
                    </div>}
                        </>
                );
            })}
        </div>
    )
}
=======
import { useEffect, useState } from "react";
import { getAllPosts, getAllPostTags } from "../../managers/PostManager";
import { getAllCategories } from "../../managers/CategoryManager";
import { getAllTags } from "../../managers/TagManager";
import { HumanDate } from "../utils/HumanDate";

export const PostList = () => {
  const [posts, setPosts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [tags, setTags] = useState([]);
  const [postTags, setPostTags] = useState([]);
  const [testing, setTesting] = useState([]);

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
    <div>
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
>>>>>>> 1aa91c7 (Fixed `Postlist` component time display)

=======
import { useEffect, useState } from "react";
import { getAllPosts, getAllPostTags } from "../../managers/PostManager";
import { getAllCategories } from "../../managers/CategoryManager";
import { getAllTags } from "../../managers/TagManager";
import { HumanDate } from "../utils/HumanDate";

export const PostList = () => {
  const [posts, setPosts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [tags, setTags] = useState([]);
  const [postTags, setPostTags] = useState([]);
  const [testing, setTesting] = useState([]);

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
    <div>
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

>>>>>>> 1aa91c7e451f03a627cf81546742d9952e82b324
        return (
          <div key={post.id}>
            <div>
              <div>Title</div>
              <div>{post.title}</div>
              <div>Author</div>
              <div>Date</div>
              <div>{HumanDate(post.publication_date.split("T")[0])}</div>
              <div>Category</div>
              <div>{postCategory ? postCategory.label : ""}</div>
              <div>Tags</div>
              <div>
                {relatedTags
                  ? relatedTags.map((tag) => tag.label).join(", ")
                  : ""}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

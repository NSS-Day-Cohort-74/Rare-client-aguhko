import { useEffect, useState } from "react";
import { PostPost } from "../../managers/PostServices";
import { getAllCategories } from "../../managers/CategoryManager";

export const CreateAPost = ({ token }) => {
  const [publishDisabled, setPublishDisabled] = useState(true);
  const [allCategories, setAllCategories] = useState([]);
  const userId = parseInt(token);

  const [newPost, setNewPost] = useState({
    user_id: userId,
    category_id: 0,
    title: "",
    publication_date: new Date(),
    image_url: "",
    content: "",
    approved: true,
  });

  useEffect(() => {
    getAllCategories().then((res) => setAllCategories(res));
  }, []);

  useEffect(() => {
    const shouldDisable = !(
      newPost.title &&
      newPost.content &&
      newPost.category_id
    );
    setPublishDisabled(shouldDisable);
  }, [newPost.category_id, newPost.content, newPost.title]);

  const handlePostSubmission = (event) => {
    event.preventDefault();

    if (userId !== 0 && newPost.content) {
      PostPost({
        ...newPost,
      });
    }
  };

  return (
    <>
      <form className="box">
        <h1 className="title">New Post</h1>
        <fieldset className="field">
          <input
            className="input"
            type="text"
            placeholder="Title"
            onChange={({ target: { value } }) => {
              setNewPost({
                ...newPost,
                title: value.trim(),
              });
            }}
          />
        </fieldset>
        <fieldset className="field">
          <input
            className="input"
            type="text"
            placeholder="Image URL"
            onChange={({ target: { value } }) => {
              setNewPost({
                ...newPost,
                image_url: value.trim(),
              });
            }}
          />
        </fieldset>
        <fieldset className="field">
          <textarea
            className="textarea"
            type="text"
            placeholder="Article Content"
            onChange={({ target: { value } }) => {
              setNewPost({
                ...newPost,
                content: value.trim(),
              });
            }}
          />
        </fieldset>
        <fieldset className="field">
          <div className="select">
            <select
              onChange={({ target: { value } }) => {
                setNewPost({
                  ...newPost,
                  category_id: parseInt(value),
                });
              }}
            >
              <option value="0">Category Select</option>
              {allCategories.map((category) => {
                return (
                  <option value={category.id} key={category.id}>
                    {category.label}
                  </option>
                );
              })}
            </select>
          </div>
        </fieldset>
        <button
          disabled={publishDisabled}
          className="button is-primary"
          onClick={handlePostSubmission}
        >
          Publish
        </button>
      </form>
    </>
  );
};

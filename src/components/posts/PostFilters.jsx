import { useState, useEffect } from "react";

const PostFilters = ({ categories, setFilteredPosts, posts,tags, users, token }) => {
  const [filters, setFilters] = useState({
    title: "",
    category: "default",
    tag: "default",
    author: "default",
  });
  useEffect(() => {
    const filterHandler = () => {
      let filtered = posts;

      if (filters.title !== "") {
        filtered = filtered.filter((post) =>
          post.title.toLowerCase().includes(filters.title.toLowerCase()),
        );
      }
      if (filters.category !== "default") {
        filtered = filtered.filter(
          (post) => post.category_id === parseInt(filters.category),
        );
      }
      if (filters.author !== "default") {
        filtered = filtered.filter(
          (post) => post.user_id === parseInt(filters.author),
        );
      }
      if (filters.tag !== "default") {
        filtered = filtered.filter((post) => 
          post.tags?.includes(filters.tag)
        )
      }
      setFilteredPosts(filtered);
    };
    filterHandler();
  }, [filters.title, filters.category, filters.author, filters.tag, posts]);

  return (
    <>
      <div className="mx-3 mb-2">
        <input
          type="text"
          placeholder="Filter by title..."
          value={filters.title}
          onChange={({ target: { value } }) => {
            setFilters({ ...filters, title: value.trim() });
          }}
          className="input"
        />
      </div>
      <div className="columns mx-3 mt-2">
        <div>
          <select
            className="ml-3 select"
            onChange={({ target: { value } }) => {
              setFilters({ ...filters, category: value });
            }}
          >
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
        </div>
        <div>
          <select
            className="ml-3 select"
            onChange={({ target: { value } }) => {
              setFilters({ ...filters, tag: value });
            }}
          >
            <option key="0" value="default">
              All Tags...
            </option>
            {tags.map(tag => 
                <option key={tag.id} value={tag.label}>
                  {tag.label}
                </option>
              )
            }
          </select>
        </div>
        <div>
          {!token ? (
            <select
              className="ml-3 select"
              onChange={({ target: { value } }) => {
                setFilters({ ...filters, author: value });
              }}
            >
              <option key="0" value="default">
                All Authors...
              </option>
              {users.map((user) => {
                return (
                  <option key={user.id} value={user.id}>
                    {user.first_name} {user.last_name}
                  </option>
                );
              })}
            </select>
          ) : (
            ""
          )}
        </div>
      </div>
    </>
  );
};

export default PostFilters;

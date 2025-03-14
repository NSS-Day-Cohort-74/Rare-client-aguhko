import { Route, Routes } from "react-router-dom";
import { Login } from "../components/auth/Login";
import { Register } from "../components/auth/Register";
import { CategoryList } from "../components/list/CategoryList";
import { TagList } from "../components/list/TagList";
import { Authorized } from "./Authorized";
import { CreateAPost } from "../components/posts/CreateAPost";
import { PostList } from "../components/posts/PostList";
import { PostDetails } from "../components/posts/PostDetails";
import UserDetails from "../components/user/UserDetails";
import UserList from "../components/user/UserList";
import SubscribedPosts from "../components/posts/SubscribedPosts";
import {PostComments} from "../components/posts/PostComments"

export const ApplicationViews = ({ token, setToken, user, setUser }) => {
  return (
    <Routes>
      <Route
        path="/login"
        element={<Login setToken={setToken} setUser={setUser} />}
      />
      <Route path="/register" element={<Register setToken={setToken} />} />
      <Route element={<Authorized token={token} />}>
        {/* Add Routes here */}
        <Route path="/" />
        <Route index element={<SubscribedPosts token={token} />} />
        <Route path="/my-posts" element={<PostList token={token} />} />
        <Route
          path="/create"
          element={<CreateAPost token={token} user={user} />}
        />
        <Route path="/tags" element={<TagList token={token} />} />
        <Route path="/categories" element={<CategoryList token={token} />} />
        <Route path="posts">
          <Route index element={<PostList />} />
          <Route path=":postId" element={<PostDetails token={token} />} />
        </Route>
        <Route path="/posts/:postId/comments" element={<PostComments token={token}/>} />
        <Route path="/users">
          <Route index element={<UserList token={token} />} />
          <Route path=":userId" element={<UserDetails token={token} />} />\
        </Route>
      </Route>
    </Routes>
  );
};

import { Route, Routes } from "react-router-dom";
import { Login } from "../components/auth/Login";
import { Register } from "../components/auth/Register";
import { CategoryList } from "../components/list/CategoryList";
import { TagList } from "../components/list/TagList";
import { Authorized } from "./Authorized";
import { CreateAPost } from "../components/posts/CreateAPost"
import { PostList } from "../components/posts/PostList";
import { PostDetails } from "../components/posts/PostDetails";

export const ApplicationViews = ({ token, setToken }) => {
	return (
		<>
			<Routes>
				<Route path="/login" element={<Login setToken={setToken} />} />
				<Route path="/register" element={<Register setToken={setToken} />} />
				<Route element={<Authorized token={token} />}>
					{/* Add Routes here */}
					<Route path="/"/>
					<Route path="/my-posts" element={<PostList token={token}/>} />
					<Route path="/create" element={<CreateAPost token={token} />} />
					<Route path="/tags" element={<TagList token={token} />} />
					<Route path="/categories" element={<CategoryList token={token} />} />
					<Route path="posts">
						<Route index element={<PostList/>} />\
						<Route path=":postId" element={<PostDetails token={token} />} />
					</Route>
				</Route>
			</Routes>
		</>
	);
};

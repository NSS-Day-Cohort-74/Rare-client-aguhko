export const getAllPosts = () => {
	return fetch("http://localhost:8088/posts").then((res) => res.json());
};

export const getAllPostTags = () => {
	return fetch("http://localhost:8088/posttags").then((res) => res.json());
}
export const getAllComments = () => {
	return fetch("http://localhost:8088/comments").then((res) => res.json());
};
export const deleteComment = (commentId) => {
    console.log(commentId)
    return fetch(`http://localhost:8088/comments/${commentId}`, {
        method: "DELETE"
    })
}
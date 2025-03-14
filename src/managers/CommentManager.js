export const getAllComments = () => {
  return fetch("http://localhost:8088/comments").then((res) => res.json());
};

export const addComment = (newComment) =>
  fetch("http://localhost:8088/new-comment", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({ ...newComment }),
  }).then((res) => res.json());


export const deleteComment = (commentId) => {
    console.log(commentId)
    return fetch(`http://localhost:8088/comments/${commentId}`, {
        method: "DELETE"
    })
}


import userEvent from "@testing-library/user-event"

export const PostPost = (postForm) => {
    return fetch("http://localhost:8088/posts", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json"
        },
        body: JSON.stringify(postForm)
    }).then((res) => res.json())
}

export const getPostsByUserId = (userId) => {
    return fetch(`http://localhost:8088/posts?user_id=${userId}`).then((res) => res.json())
}
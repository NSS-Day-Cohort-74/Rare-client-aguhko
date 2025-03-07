import { useEffect, useState } from "react"
import { getAllPosts, getAllPostTags } from "../../managers/PostManager"
import { getAllCategories } from "../../managers/CategoryManager"
import { getAllTags } from "../../managers/TagManager"
import { getPostsByUserId } from "../../managers/PostServices"
import { getAllUsers } from "../../managers/UserManager"

export const PostList = ({token}) => {
    const [posts, setPosts] = useState([])
    const [categories, setCategories] = useState([])
    const [tags, setTags] = useState([])
    const [postTags, setPostTags] = useState([])
    const [users, setUsers] = useState([])
    const [filterCategory, setFilteredCategory] = useState(posts);

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
            getAllUsers().then(usersArray => {
                setUsers(usersArray)
            })
        }
    }, [token])

    useEffect(() => {
        setFilteredCategory(posts);
    }, [posts]);

    const handleDeletePost = (event) => {
        console.log("Post Deleted!")
    }

    const handleEditPost = (event) => {
        console.log("Navigating to post editing!")
    }

    const handleFormChange = (event) => {
        if(event.target.value === "default"){
            setFilteredCategory(posts)
        } else{
            let filteredPost = posts.filter(post => post.category_id === parseInt(event.target.value))
            setFilteredCategory(filteredPost)            
        }
    }

    return (
        <div>
            <select className="input-field" onChange={handleFormChange}>
                    <option value="default">Prompt to select resource...</option>
                    {categories.map((category) => {
                        return (
                            <option key={category.id} value={category.id}>{category.label}</option>
                        )
                    })}
                </select>
                    
            {filterCategory.map((post) => {

                let postCategory = categories.find(category => category.id === post.category_id)

                let postTagArr = postTags.filter(postTag => postTag.post_id === post.id)
                
                let relatedTags = postTagArr.flatMap(postTag =>
                    tags.filter(tag => tag.id === postTag.tag_id)
                );

                let postUser = users.find(user => user.id === post.user_id)
                
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
                            <div>{postUser?.first_name}</div>
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


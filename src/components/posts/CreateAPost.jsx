import { useEffect, useRef, useState } from "react"
import { PostPost } from "../../managers/PostServices"
import { getAllCategories } from "../../managers/CategoryManager"
import { eventWrapper } from "@testing-library/user-event/dist/utils"
export const CreateAPost = ({token}) => {
    const [allCategories, setAllCategories]  = useState([])
    const [category, setCategory] = useState(0)
    const userId = token
    const title = useRef()
    const image = useRef()
    const content = useRef()
    const approved = 0

    useEffect(() => {
        getAllCategories().then((res) => setAllCategories(res))
    }, [])

    const handleCategorySelect = (event) => {
        setCategory(parseInt(event.target.value))
    }

    const handlePostSubmission = (event) => {
        event.preventDefault()
        if(userId != 0 && content !="") {
            const postForm = {
                user_id: userId,
                category_id: category,
                title: title.current.value,
                publication_date: new Date(),
                image_url: image.current.value,
                content: content.current.value,
                approved: approved
            }
            PostPost(postForm)
        }
    }

    return <>
    <form>
        <h1>New Post</h1>
        <fieldset>
            <input type="text" placeholder="Title" ref={title}/>
        </fieldset>
        <fieldset>
            <input type="text" placeholder="ImageURL" ref={image}/>
        </fieldset>
        <fieldset>
            <textarea type="text" placeholder="Article Content" ref={content}/>
        </fieldset>
        <fieldset>
            {allCategories 
            ?
            <select onChange={handleCategorySelect}>
                <option value="0">Category Select</option>
                {allCategories.map((category) => {
                    return <option value={category.id} key={category.id}>{category.label}</option>
                })}
            </select>
            : ""}

        </fieldset>
        <button onClick={handlePostSubmission}>
            Publish
        </button>
    </form>
    </>
}
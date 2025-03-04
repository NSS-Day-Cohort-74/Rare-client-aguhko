import { useEffect, useRef, useState } from "react"
import { HumanDate } from "../utils/HumanDate"
import { PostPost } from "../../managers/PostServices"

export const CreateAPost = ({token}) => {
    const [category, setCategory] = useState(0)
    const userId = token
    const categoryId = category
    const title = useRef()
    const image = useRef()
    const content = useRef()
    const approved = false

    useEffect(() => {
        // Waiting for fetch calls to be made for category objects
    }, [])

    // useEffect(() => {
    //     const date = new Date()
    //     const year = date.getFullYear()
    // }, [])
    const handlePostSubmission = (event) => {
        event.preventDefault()
        if(userId != 0 && content !="") {
            const postForm = {
                user_id: userId,
                category_id: categoryId,
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
            {/* Placeholder until categories are created */}
            <select>
                <option value="0">Category Select</option>
            </select>
        </fieldset>
        <button onClick={handlePostSubmission}>
            Publish
        </button>
    </form>
    </>
}
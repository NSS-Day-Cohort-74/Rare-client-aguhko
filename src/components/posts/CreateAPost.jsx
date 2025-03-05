import { useEffect, useRef, useState } from "react"
import { PostPost } from "../../managers/PostServices"
import { getAllCategories } from "../../managers/CategoryManager"
export const CreateAPost = ({token}) => {
    const [allCategories, setAllCategories]  = useState([])
    const [category, setCategory] = useState(0)
    const userId = token
    const title = useRef()
    const image = useRef()
    const content = useRef()

    useEffect(() => {
        getAllCategories().then((res) => setAllCategories(res))
    }, [])

    const handleCategorySelect = (event) => {
        setCategory(parseInt(event.target.value))
    }

    const handlePostSubmission = (event) => {
        event.preventDefault()

        if(userId !== 0 && content !== "") {
            const postForm = {
                user_id: userId,
                category_id: category,
                title: title.current.value,
                publication_date: new Date(),
                image_url: image.current.value,
                content: content.current.value,
                approved: true
            }
            PostPost(postForm)
        }
    }

    return <>
    <form className="box">
        <h1 className="title">New Post</h1>
        <fieldset className="field">
            <input className="input" type="text" placeholder="Title" ref={title}/>
        </fieldset>
        <fieldset className="field">
            <input className="input" type="text" placeholder="ImageURL" ref={image}/>
        </fieldset>
        <fieldset className="field">
            <textarea className="textarea" type="text" placeholder="Article Content" ref={content}/>
        </fieldset>
        <fieldset className="field">
            {allCategories 
            ?
          <div
          className="select"
          >
            <select 
            onChange={handleCategorySelect}>
                <option value="0">Category Select</option>
                {allCategories.map((category) => {
                    return <option value={category.id} key={category.id}>{category.label}</option>
                })}
            </select>
            </div>
            : ""}

        </fieldset>
        <button
        className="button is-primary"
        onClick={handlePostSubmission}>
            Publish
        </button>
    </form>
    </>
}

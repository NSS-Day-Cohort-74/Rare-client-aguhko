import { useEffect, useState } from "react"
import { createTag, getAllTags } from "../../managers/TagManager"
import ResourceList from "./ResourceList"

export const TagList = ({ token }) => {
  const [tags, setTags] = useState([])

  const updateTags = () => {
    getAllTags().then((allTags) => { setTags(allTags) })
  }

  useEffect(() => {
    updateTags()
  }, [token])

  return (
    <>
      <ResourceList headerText="Tags" data={tags} getData={updateTags} createResource={createTag} />
    </>
  )
}

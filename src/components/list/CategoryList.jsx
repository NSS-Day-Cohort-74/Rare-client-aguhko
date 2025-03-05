import { useEffect, useState } from "react"
import { createCategory, getAllCategories } from "../../managers/CategoryManager"
import ResourceList from "./ResourceList"

export const CategoryList = ({ token }) => {
  const [categories, setCategories] = useState([])

  const updateCategories = () => {
    getAllCategories().then((allTags) => { setCategories(allTags) })
  }

  useEffect(() => {
    updateCategories()
  }, [token])

  return (
    <>
      <ResourceList headerText="Categories" data={categories} getData={updateCategories} createResource={createCategory} />
    </>
  )
}

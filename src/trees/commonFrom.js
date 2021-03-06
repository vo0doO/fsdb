import mapRecurse from "../helpers/mapRecurse"
import { mergeWithProps } from "../helpers/mergeProps"
import sortChildren from "../helpers/sortChildren"

export default function(name) {

  return mapRecurse((node) => {

    if (!node.children) { return node }

    sortChildren(node)

    let inheritance = []

    node.children = node.children.filter((obj) => {
      if (obj.isFile && obj.path.name === name) {
        inheritance.push(obj)
        return false
      }
      return true
    })

    inheritance.forEach((obj) => {
      node.children.forEach((child) => {
        child.data = mergeWithProps(child.data, obj.data, false)
        child.sources.push(obj.pathStr)
      })
    })

    return node

  })

}

/** Create a temporary probably-unique id */
export const createId = () => {
  return Math.random().toString(36).substring(2)
}
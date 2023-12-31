/** Fischer-Yates shuffle */
export const shuffle = <T>(array: T[]) => {
  const result = [...array]
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    ;[result[i], result[j]] = [result[j], result[i]]
  }
  return result
}
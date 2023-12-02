/** Pluralize */
export const pluralize = (
  count: unknown[] | number,
  singular: string,
  plural: string
) => {
  return (Array.isArray(count) ? count.length : count) === 1 ? singular : plural
}
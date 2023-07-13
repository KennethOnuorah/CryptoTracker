export const validateQuery = (query: string, possibleMatches: string[]): Promise<string> => {
  return new Promise<string>((resolve, reject) => {
    if (possibleMatches.map(elem => elem.toLowerCase()).includes(query.toLowerCase())) {
      const result = possibleMatches.find(elem => elem.toLowerCase() === query.toLowerCase()) as string
      resolve(result)
    } else {
      reject(new Error(`Query "${query}" not found in searched list.`))
    }
  })
}
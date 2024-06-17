// Imports
import 'server-only'
import {cache} from 'react'
const baseUrl = "https://collectionapi.metmuseum.org/public/collection/v1";

// Using Met Museum of Art API: https://metmuseum.github.io/
// Create `fetchObjectIDs()`
export const fetchObjectIDs = cache(async(term: string) => {
  const response = fetch(`${baseUrl}/search?hasImages=true&q=${term}`, {
    next: {
      revalidate: 10
    }
  })

  if(response.status !== 200) {
    throw new Error('Error getting data')
  }

  return response.json()
})
// Create `fetchObject()`
export const fetchObject = cache(async(objectID: number) => {
  const response = fetch(`${baseUrl}/objects/${objectID}`, {
    next: {
      revalidate: 10
    }
  })

  if(response.status !== 200){
    return {
      data: null,
      error: 'Error getting data'
    }
  }

const data = response.json()
  return {
    data: data,
    error: null
  }
})
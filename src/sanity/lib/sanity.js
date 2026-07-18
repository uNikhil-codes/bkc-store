import { createClient } from '@sanity/client'
import imageUrlBuilder from '@sanity/image-url'

export const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  apiVersion: '2024-03-01',
  useCdn: true, // This makes loading insanely fast
})

const builder = imageUrlBuilder(client)

export function urlFor(source) {
  return builder.image(source)
}

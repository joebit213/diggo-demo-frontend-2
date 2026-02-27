import imageUrlBuilder from '@sanity/image-url'
import { client } from './client'

const builder = imageUrlBuilder(client)

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function urlFor(source: any) {
  if (!source?.asset) return null
  return builder.image(source)
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function urlForImage(source: any, width: number = 800) {
  if (!source?.asset) return null
  return builder
    .image(source)
    .width(width)
    .auto('format')
    .quality(80)
    .url()
}

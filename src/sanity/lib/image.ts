import imageUrlBuilder from '@sanity/image-url'
import { client } from './client'

const builder = imageUrlBuilder(client)

/**
 * Genera URL builder para una imagen de Sanity
 * Uso: urlFor(image).width(800).format('webp').url()
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function urlFor(source: any) {
  return builder.image(source)
}

/**
 * Genera URL optimizada directamente
 * Siempre retorna WebP con las dimensiones especificadas
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function urlForImage(
  source: any,
  width: number = 800,
  height?: number
): string | null {
  if (!source?.asset) return null

  let img = builder.image(source).width(width)

  if (height) {
    img = img.height(height).fit('crop')
  }

  return img.format('webp').quality(85).url()
}

/**
 * Genera URL para imagen hero (1920x1080)
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function urlForHero(source: any): string | null {
  return urlForImage(source, 1920, 1080)
}

/**
 * Genera URL para thumbnail de proyecto (600x400)
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function urlForProject(source: any): string | null {
  return urlForImage(source, 600, 400)
}

/**
 * Genera URL para icono/servicio (120x120)
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function urlForIcon(source: any): string | null {
  return urlForImage(source, 120, 120)
}

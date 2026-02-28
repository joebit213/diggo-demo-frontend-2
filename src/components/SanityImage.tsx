'use client'

import { urlFor } from '@/sanity/lib/image'

// Aspect ratios predefinidos para diferentes secciones
export const ASPECT_RATIOS = {
  // Hero - panorámico
  hero: { width: 1920, height: 1080 },
  // Proyectos - cuadrado o 4:3
  proyecto: { width: 800, height: 600 },
  proyectoCard: { width: 600, height: 400 },
  // Servicios - iconos cuadrados
  icono: { width: 120, height: 120 },
  // Testimonios - avatar circular
  avatar: { width: 200, height: 200 },
  // Blog - thumbnail
  thumbnail: { width: 400, height: 300 },
  // Genérico 16:9
  widescreen: { width: 1600, height: 900 },
  // Genérico cuadrado
  square: { width: 800, height: 800 },
} as const

type AspectRatioKey = keyof typeof ASPECT_RATIOS

interface SanityImageProps {
  // El objeto de imagen de Sanity
  image: {
    asset?: {
      _ref?: string
      _id?: string
      url?: string
    }
    hotspot?: {
      x: number
      y: number
    }
    crop?: {
      top: number
      bottom: number
      left: number
      right: number
    }
  } | null | undefined

  // Aspect ratio predefinido o dimensiones custom
  aspect?: AspectRatioKey
  width?: number
  height?: number

  // Atributos de imagen
  alt: string
  className?: string
  priority?: boolean

  // Calidad (1-100)
  quality?: number

  // Fit mode
  fit?: 'clip' | 'crop' | 'fill' | 'fillmax' | 'max' | 'scale' | 'min'
}

export function SanityImage({
  image,
  aspect,
  width: customWidth,
  height: customHeight,
  alt,
  className = '',
  priority = false,
  quality = 85,
  fit = 'crop',
}: SanityImageProps) {
  // Si no hay imagen, mostrar placeholder
  if (!image?.asset) {
    return (
      <div
        className={`bg-gray-200 flex items-center justify-center ${className}`}
        style={{
          aspectRatio: aspect
            ? `${ASPECT_RATIOS[aspect].width}/${ASPECT_RATIOS[aspect].height}`
            : customWidth && customHeight
            ? `${customWidth}/${customHeight}`
            : '16/9',
        }}
      >
        <span className="text-gray-400 text-sm">Sin imagen</span>
      </div>
    )
  }

  // Determinar dimensiones
  let width: number
  let height: number

  if (aspect && ASPECT_RATIOS[aspect]) {
    width = ASPECT_RATIOS[aspect].width
    height = ASPECT_RATIOS[aspect].height
  } else if (customWidth && customHeight) {
    width = customWidth
    height = customHeight
  } else {
    width = 1200
    height = 800
  }

  // Construir URL optimizada con WebP
  const imageUrl = urlFor(image)
    .width(width)
    .height(height)
    .fit(fit)
    .format('webp')
    .quality(quality)
    .url()

  // URL de baja calidad para blur placeholder
  const blurUrl = urlFor(image)
    .width(20)
    .height(Math.round((20 * height) / width))
    .blur(50)
    .format('webp')
    .quality(30)
    .url()

  return (
    <img
      src={imageUrl}
      alt={alt}
      className={className}
      loading={priority ? 'eager' : 'lazy'}
      decoding="async"
      style={{
        backgroundImage: `url(${blurUrl})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    />
  )
}

// Componente simplificado para uso rápido
export function HeroImage({ image, alt, className }: { image: any; alt: string; className?: string }) {
  return <SanityImage image={image} aspect="hero" alt={alt} className={className} priority />
}

export function ProjectImage({ image, alt, className }: { image: any; alt: string; className?: string }) {
  return <SanityImage image={image} aspect="proyectoCard" alt={alt} className={className} />
}

export function IconImage({ image, alt, className }: { image: any; alt: string; className?: string }) {
  return <SanityImage image={image} aspect="icono" alt={alt} className={className} />
}

export function AvatarImage({ image, alt, className }: { image: any; alt: string; className?: string }) {
  return <SanityImage image={image} aspect="avatar" alt={alt} className={`rounded-full ${className || ''}`} />
}

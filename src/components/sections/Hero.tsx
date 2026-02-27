'use client'

import { useState, useEffect } from 'react'

interface Slide {
  _key: string
  tag?: string
  titulo: string
  descripcion?: string
  morphTextoFijo?: string
  morphPalabras?: string[]
  imagen?: { asset?: { url?: string } }
  ctaTexto?: string
  ctaLink?: string
  colorPrimario?: string
  colorSecundario?: string
}

interface HeroProps {
  data: {
    slides?: Slide[]
    textoEsquinaSuperior?: string
    textoEsquinaInferior?: string
    textoScroll?: string
  }
}

export function Hero({ data }: HeroProps) {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [morphIndex, setMorphIndex] = useState(0)
  const slides = data.slides || []

  // Auto-rotate slides
  useEffect(() => {
    if (slides.length <= 1) return
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length)
    }, 5000)
    return () => clearInterval(interval)
  }, [slides.length])

  // Morph words animation
  useEffect(() => {
    const currentWords = slides[currentSlide]?.morphPalabras || []
    if (currentWords.length <= 1) return
    const interval = setInterval(() => {
      setMorphIndex((prev) => (prev + 1) % currentWords.length)
    }, 2000)
    return () => clearInterval(interval)
  }, [currentSlide, slides])

  if (!slides.length) {
    return (
      <section className="h-screen bg-gray-900 flex items-center justify-center">
        <p className="text-white text-xl">Agrega slides en Sanity</p>
      </section>
    )
  }

  const slide = slides[currentSlide]
  const morphWords = slide?.morphPalabras || []

  return (
    <section className="relative h-screen overflow-hidden bg-gray-900">
      {/* Background Image */}
      {slide?.imagen?.asset?.url && (
        <div
          className="absolute inset-0 bg-cover bg-center transition-all duration-1000"
          style={{ backgroundImage: `url(${slide.imagen.asset.url})` }}
        >
          <div className="absolute inset-0 bg-black/50" />
        </div>
      )}

      {/* Decorative shapes */}
      <div
        className="absolute top-20 right-20 w-32 h-32 rounded-full opacity-60 blur-xl"
        style={{
          background: `linear-gradient(135deg, ${slide?.colorPrimario || '#C8F135'}, ${slide?.colorSecundario || '#667EEA'})`
        }}
      />

      {/* Content */}
      <div className="relative z-10 h-full flex flex-col justify-center px-8 md:px-16 lg:px-24">
        {/* Tag */}
        {slide?.tag && (
          <span className="text-sm tracking-[0.3em] text-white/70 mb-4">
            {slide.tag}
          </span>
        )}

        {/* Title */}
        <h1 className="text-6xl md:text-8xl lg:text-9xl font-black text-white mb-6 tracking-tight">
          {slide?.titulo}
        </h1>

        {/* Morph text */}
        {slide?.morphTextoFijo && (
          <div className="flex items-center gap-3 text-2xl md:text-3xl text-white/90 mb-6">
            <span>{slide.morphTextoFijo}</span>
            <span
              className="font-bold transition-all duration-500"
              style={{ color: slide?.colorPrimario || '#C8F135' }}
            >
              {morphWords[morphIndex] || morphWords[0]}
            </span>
          </div>
        )}

        {/* Description */}
        {slide?.descripcion && (
          <p className="text-lg text-white/70 max-w-xl mb-8">
            {slide.descripcion}
          </p>
        )}

        {/* CTA */}
        {slide?.ctaTexto && (
          <a
            href={slide.ctaLink || '#'}
            className="inline-flex items-center gap-2 px-6 py-3 bg-white text-black font-medium rounded-full hover:bg-white/90 transition w-fit"
          >
            {slide.ctaTexto}
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none">
              <path d="M5 12h14M12 5l7 7-7 7" stroke="currentColor" strokeWidth="2"/>
            </svg>
          </a>
        )}
      </div>

      {/* Corner texts */}
      {data.textoEsquinaSuperior && (
        <div className="absolute top-6 left-6 text-xs text-white/50 tracking-wider">
          {data.textoEsquinaSuperior}
        </div>
      )}
      {data.textoEsquinaInferior && (
        <div className="absolute bottom-6 right-6 text-xs text-white/50 tracking-wider">
          {data.textoEsquinaInferior}
        </div>
      )}

      {/* Slide indicators */}
      {slides.length > 1 && (
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2">
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentSlide(i)}
              className={`w-2 h-2 rounded-full transition ${
                i === currentSlide ? 'bg-white w-8' : 'bg-white/40'
              }`}
            />
          ))}
        </div>
      )}

      {/* Scroll indicator */}
      {data.textoScroll && (
        <div className="absolute bottom-8 left-8 flex flex-col items-center gap-2">
          <div className="w-px h-12 bg-white/30" />
          <span className="text-xs text-white/50 tracking-wider rotate-90 origin-center translate-y-4">
            {data.textoScroll}
          </span>
        </div>
      )}
    </section>
  )
}

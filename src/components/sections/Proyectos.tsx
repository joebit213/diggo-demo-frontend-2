'use client'

import { useState } from 'react'

interface Proyecto {
  _id: string
  titulo: string
  slug?: string
  cliente?: string
  descripcion?: string
  imagen?: { asset?: { url?: string } }
  categoria?: string
}

interface ProyectosProps {
  data: {
    titulo?: string
    subtitulo?: string
    mostrarFiltros?: boolean
    proyectos?: Proyecto[]
    layout?: string
    verMasLink?: {
      mostrar?: boolean
      texto?: string
      link?: string
    }
  }
}

const CATEGORIAS = [
  { value: 'all', label: 'Todos' },
  { value: 'digital-commerce', label: 'Digital Commerce' },
  { value: 'digital-thinking', label: 'Digital Thinking' },
  { value: 'growth-marketing', label: 'Growth Marketing' },
  { value: 'it-factory', label: 'IT Factory' },
]

export function Proyectos({ data }: ProyectosProps) {
  const [filtro, setFiltro] = useState('all')
  const proyectos = data.proyectos || []

  const proyectosFiltrados = filtro === 'all'
    ? proyectos
    : proyectos.filter(p => p.categoria === filtro)

  return (
    <section className="py-24 px-8 md:px-16 lg:px-24 bg-gray-100">
      {/* Header */}
      <div className="text-center mb-12">
        {data.titulo && (
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            {data.titulo}
          </h2>
        )}
        {data.subtitulo && (
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            {data.subtitulo}
          </p>
        )}
      </div>

      {/* Filters */}
      {data.mostrarFiltros && (
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {CATEGORIAS.map((cat) => (
            <button
              key={cat.value}
              onClick={() => setFiltro(cat.value)}
              className={`px-5 py-2 rounded-full text-sm font-medium transition ${
                filtro === cat.value
                  ? 'bg-gray-900 text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-200'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      )}

      {/* Projects Grid */}
      {proyectosFiltrados.length > 0 ? (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {proyectosFiltrados.map((proyecto) => (
            <div
              key={proyecto._id}
              className="group relative aspect-[4/3] rounded-2xl overflow-hidden bg-gray-200"
            >
              {/* Image */}
              {proyecto.imagen?.asset?.url && (
                <img
                  src={proyecto.imagen.asset.url}
                  alt={proyecto.titulo}
                  className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition duration-500"
                />
              )}

              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

              {/* Content */}
              <div className="absolute bottom-0 left-0 right-0 p-6 translate-y-4 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition duration-300">
                <span className="text-xs text-white/70 uppercase tracking-wider">
                  {proyecto.cliente}
                </span>
                <h3 className="text-xl font-bold text-white mt-1">
                  {proyecto.titulo}
                </h3>
                {proyecto.descripcion && (
                  <p className="text-sm text-white/70 mt-2 line-clamp-2">
                    {proyecto.descripcion}
                  </p>
                )}
              </div>

              {/* Category badge */}
              <div className="absolute top-4 left-4">
                <span className="px-3 py-1 bg-white/90 text-xs font-medium text-gray-900 rounded-full">
                  {proyecto.categoria?.replace('-', ' ')}
                </span>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-400">No hay proyectos para mostrar</p>
      )}

      {/* Ver más button */}
      {data.verMasLink?.mostrar && (
        <div className="text-center mt-12">
          <a
            href={data.verMasLink.link || '/proyectos'}
            className="inline-flex items-center gap-2 px-8 py-4 bg-gray-900 text-white font-medium rounded-full hover:bg-gray-800 transition"
          >
            {data.verMasLink.texto || 'Ver todos los proyectos'}
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none">
              <path d="M5 12h14M12 5l7 7-7 7" stroke="currentColor" strokeWidth="2"/>
            </svg>
          </a>
        </div>
      )}
    </section>
  )
}

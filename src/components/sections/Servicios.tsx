interface Servicio {
  _key: string
  nombre: string
  descripcion?: string
  icono?: { asset?: { url?: string } }
  link?: string
}

interface ServiciosProps {
  data: {
    titulo?: string
    subtitulo?: string
    servicios?: Servicio[]
    layout?: string
  }
}

export function Servicios({ data }: ServiciosProps) {
  const servicios = data.servicios || []

  const gridCols = {
    'grid-2': 'md:grid-cols-2',
    'grid-3': 'md:grid-cols-3',
    'grid-4': 'md:grid-cols-2 lg:grid-cols-4',
    'list': 'grid-cols-1',
  }[data.layout || 'grid-4'] || 'md:grid-cols-2 lg:grid-cols-4'

  return (
    <section className="py-24 px-8 md:px-16 lg:px-24 bg-white">
      {/* Header */}
      <div className="text-center mb-16">
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

      {/* Services Grid */}
      {servicios.length > 0 ? (
        <div className={`grid ${gridCols} gap-8`}>
          {servicios.map((servicio) => (
            <div
              key={servicio._key}
              className="group p-8 bg-gray-50 rounded-2xl hover:bg-gray-900 transition-colors duration-300"
            >
              {/* Icon */}
              {servicio.icono?.asset?.url ? (
                <img
                  src={servicio.icono.asset.url}
                  alt={servicio.nombre}
                  className="w-12 h-12 mb-6 group-hover:brightness-0 group-hover:invert transition"
                />
              ) : (
                <div className="w-12 h-12 mb-6 rounded-lg bg-gray-200 group-hover:bg-gray-700" />
              )}

              {/* Name */}
              <h3 className="text-xl font-bold text-gray-900 group-hover:text-white mb-3 transition">
                {servicio.nombre}
              </h3>

              {/* Description */}
              {servicio.descripcion && (
                <p className="text-gray-600 group-hover:text-gray-300 transition">
                  {servicio.descripcion}
                </p>
              )}

              {/* Link */}
              {servicio.link && (
                <a
                  href={servicio.link}
                  className="inline-flex items-center gap-2 mt-4 text-sm font-medium text-gray-900 group-hover:text-white transition"
                >
                  Ver más
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none">
                    <path d="M5 12h14M12 5l7 7-7 7" stroke="currentColor" strokeWidth="2"/>
                  </svg>
                </a>
              )}
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-400">Agrega servicios en Sanity</p>
      )}
    </section>
  )
}

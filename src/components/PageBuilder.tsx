import { Hero } from './sections/Hero'
import { Servicios } from './sections/Servicios'
import { Proyectos } from './sections/Proyectos'
import { Contacto } from './sections/Contacto'

interface Section {
  _key: string
  _type: string
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any
}

interface PageBuilderProps {
  sections: Section[] | null
}

export function PageBuilder({ sections }: PageBuilderProps) {
  if (!sections || sections.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="text-center p-8">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">
            ¡Bienvenido al Demo!
          </h1>
          <p className="text-gray-600 mb-6">
            Abre Sanity Studio y agrega secciones a la página Home
          </p>
          <a
            href="https://diggo-agency-demo.sanity.studio"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block px-6 py-3 bg-black text-white rounded-lg hover:bg-gray-800 transition"
          >
            Abrir Sanity Studio →
          </a>
        </div>
      </div>
    )
  }

  return (
    <main>
      {sections.map((section) => {
        switch (section._type) {
          case 'seccionHero':
            return <Hero key={section._key} data={section} />
          case 'seccionServicios':
            return <Servicios key={section._key} data={section} />
          case 'seccionProyectos':
            return <Proyectos key={section._key} data={section} />
          case 'seccionContacto':
            return <Contacto key={section._key} data={section} />
          default:
            return (
              <div key={section._key} className="p-8 bg-yellow-50 text-center">
                <p className="text-yellow-800">
                  Sección desconocida: <code>{section._type}</code>
                </p>
              </div>
            )
        }
      })}
    </main>
  )
}

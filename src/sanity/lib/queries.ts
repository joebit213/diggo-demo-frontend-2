// Query para Home - incluye hotspot y crop para imágenes
export const HOME_QUERY = `*[_type == "home"][0]{
  _id,
  titulo,
  descripcion,
  secciones[]{
    _key,
    _type,

    // Hero
    _type == "seccionHero" => {
      slides[]{
        _key,
        tag,
        titulo,
        descripcion,
        morphTextoFijo,
        morphPalabras,
        // Imagen con hotspot y crop para recorte inteligente
        imagen {
          asset->,
          hotspot,
          crop
        },
        ctaTexto,
        ctaLink,
        colorPrimario,
        colorSecundario
      },
      textoEsquinaSuperior,
      textoEsquinaInferior,
      textoScroll,
      autoplay,
      efectoTransicion
    },

    // Servicios
    _type == "seccionServicios" => {
      titulo,
      subtitulo,
      servicios[]{
        _key,
        nombre,
        descripcion,
        icono {
          asset->,
          hotspot,
          crop
        },
        link
      },
      layout
    },

    // Proyectos
    _type == "seccionProyectos" => {
      titulo,
      subtitulo,
      mostrarFiltros,
      "proyectos": proyectosDestacados[]->{
        _id,
        titulo,
        "slug": slug.current,
        cliente,
        descripcion,
        imagen {
          asset->,
          hotspot,
          crop
        },
        categoria
      },
      layout,
      verMasLink
    },

    // Contacto
    _type == "seccionContacto" => {
      titulo,
      subtitulo,
      email,
      telefono,
      oficinas[]{
        _key,
        pais,
        ciudad,
        direccion
      },
      redesSociales[]{
        _key,
        plataforma,
        url
      },
      mostrarFormulario
    }
  }
}`

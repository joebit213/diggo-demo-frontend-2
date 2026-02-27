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
        imagen { asset->{ _id, url } },
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
        icono { asset->{ url } },
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
        imagen { asset->{ url } },
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

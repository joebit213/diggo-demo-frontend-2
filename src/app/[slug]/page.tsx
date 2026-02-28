import { sanityFetch } from "@/sanity/lib/live";
import { client } from "@/sanity/lib/client";
import { PageBuilder } from "@/components/PageBuilder";
import { notFound } from "next/navigation";

// Query para obtener una página por slug
const PAGE_QUERY = `*[_type == "pagina" && slug.current == $slug][0]{
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
}`;

// Query para obtener todos los slugs (para generación estática)
const SLUGS_QUERY = `*[_type == "pagina" && defined(slug.current)][].slug.current`;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type PageData = any;

// Generar rutas estáticas en build time
// Usa client directamente porque no hay request context en build time
export async function generateStaticParams() {
  const slugs = await client.fetch<string[]>(SLUGS_QUERY);

  return (slugs || []).map((slug) => ({
    slug,
  }));
}

// Metadata dinámica para SEO
export async function generateMetadata({
  params
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params;
  const { data } = await sanityFetch({
    query: PAGE_QUERY,
    params: { slug }
  });

  const page = data as PageData;

  return {
    title: page?.titulo || 'Página',
    description: page?.descripcion || '',
  };
}

// Componente de página
export default async function DynamicPage({
  params
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params;
  const { data } = await sanityFetch({
    query: PAGE_QUERY,
    params: { slug }
  });

  const page = data as PageData;

  // Si no existe la página, mostrar 404
  if (!page) {
    notFound();
  }

  return <PageBuilder sections={page?.secciones ?? null} />;
}

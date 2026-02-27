import { sanityFetch } from "@/sanity/lib/live";
import { HOME_QUERY } from "@/sanity/lib/queries";
import { PageBuilder } from "@/components/PageBuilder";

interface HomeData {
  _id: string;
  titulo?: string;
  descripcion?: string;
  secciones?: Array<{
    _key: string;
    _type: string;
    [key: string]: unknown;
  }>;
}

export default async function HomePage() {
  const { data } = await sanityFetch<HomeData | null>({ query: HOME_QUERY });

  return <PageBuilder sections={data?.secciones ?? null} />;
}

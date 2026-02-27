import { sanityFetch } from "@/sanity/lib/live";
import { HOME_QUERY } from "@/sanity/lib/queries";
import { PageBuilder } from "@/components/PageBuilder";

export default async function HomePage() {
  const { data } = await sanityFetch({ query: HOME_QUERY });

  return <PageBuilder sections={data?.secciones} />;
}

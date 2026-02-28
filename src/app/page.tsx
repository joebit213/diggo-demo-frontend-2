import { sanityFetch } from "@/sanity/lib/live";
import { HOME_QUERY } from "@/sanity/lib/queries";
import { PageBuilder } from "@/components/PageBuilder";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type HomeData = any;

export default async function HomePage() {
  const { data } = await sanityFetch({ query: HOME_QUERY });

  return <PageBuilder sections={(data as HomeData)?.secciones ?? null} />;
}

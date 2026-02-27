import { client } from './client'
import { draftMode } from 'next/headers'

// Manual sanityFetch implementation (compatible with all next-sanity versions)
export async function sanityFetch<T>({
  query,
  params = {},
  tags = [],
}: {
  query: string
  params?: Record<string, unknown>
  tags?: string[]
}): Promise<{ data: T }> {
  const isDraftMode = (await draftMode()).isEnabled

  const result = await client.fetch<T>(query, params, {
    perspective: isDraftMode ? 'previewDrafts' : 'published',
    useCdn: !isDraftMode,
    stega: isDraftMode,
    ...(isDraftMode ? {} : { next: { tags, revalidate: 60 } }),
  })

  return { data: result }
}

// SanityLive component - placeholder for live updates
// In production, you can enhance this with @sanity/preview-kit for real-time updates
export function SanityLive() {
  return null
}

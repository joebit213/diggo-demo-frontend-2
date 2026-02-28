import { client } from './client'
import { draftMode } from 'next/headers'

const token = process.env.SANITY_API_READ_TOKEN

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

  // Use token for draft mode to read unpublished content
  const fetchClient = isDraftMode && token
    ? client.withConfig({ token, useCdn: false })
    : client

  const result = await fetchClient.fetch<T>(query, params, {
    perspective: isDraftMode ? 'previewDrafts' : 'published',
    stega: isDraftMode,
    ...(isDraftMode ? { cache: 'no-store' } : { next: { tags, revalidate: 60 } }),
  })

  return { data: result }
}

// SanityLive component - placeholder for live updates
// In production, you can enhance this with @sanity/preview-kit for real-time updates
export function SanityLive() {
  return null
}

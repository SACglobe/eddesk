import { MetadataRoute } from 'next'
import { headers } from 'next/headers'
import { getBaseUrl } from '@/lib/domain'

export const revalidate = 86400; // Cache robots.txt for 24 hours

export default async function robots(): Promise<MetadataRoute.Robots> {
  const host = 'www.eddesk.in'
  const baseUrl = getBaseUrl(host)

  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: [
          '/api/',
          '/_next/',
          '/admin/',
          '/private/',
          '/cache/',
          '/proxy/',
        ],
      },
      {
        userAgent: ['GPTBot', 'ChatGPT-User', 'Claude-Web', 'ClaudeBot', 'PerplexityBot', 'YouBot', 'PiplBot', 'Google-Extended'],
        allow: '/',
      }
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
  }
}


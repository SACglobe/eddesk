import { ImageResponse } from 'next/og';
import { fetchTenantScreen } from '@/core/services/screenData.service';
import { resolveImageUrl } from '@/core/utils/url';

// Route segment config
export const runtime = 'edge';

// Image metadata
export const alt = 'School Icon';
export const size = {
  width: 96,
  height: 96,
};
export const contentType = 'image/png';

// Image generation
export default async function Icon({ params }: { params: { domain: string } }) {
  const { domain } = params;
  
  // We fetch the home screen data to get the school branding
  const result = await fetchTenantScreen(domain, 'home');
  
  if (result.status !== 'success') {
    return new Response('Not Found', { status: 404 });
  }

  const school = result.payload.school;
  const rawLogoUrl = (school.favicon_url || school.faviconurl || school.logo_url || school.logourl || school.logoUrl) as string;
  const logoUrl = resolveImageUrl(rawLogoUrl);

  // Fallback if no logo
  if (!logoUrl) {
    return new Response('No Logo', { status: 404 });
  }

  return new ImageResponse(
    (
      <div
        style={{
          background: 'white',
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '4px',
        }}
      >
        <img
          src={logoUrl}
          style={{
            maxWidth: '100%',
            maxHeight: '100%',
            objectFit: 'contain',
          }}
        />
      </div>
    ),
    {
      ...size,
    }
  );
}

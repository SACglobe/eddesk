import { ImageResponse } from 'next/og';
import { fetchTenantScreen } from '@/core/services/screenData.service';
import { resolveImageUrl } from '@/core/utils/url';

export const runtime = 'nodejs';

export async function GET(
  request: Request,
  { params }: { params: Promise<{ domain: string }> }
) {
  const { domain } = await params;
  console.log(`[Icon Route DEBUG] Generating icon for domain: ${domain}`);
  
  // We fetch the home screen data to get the school branding
  const result = await fetchTenantScreen(domain, 'home');
  
  if (result.status !== 'success') {
    return new Response('Not Found', { status: 404 });
  }

  const school = result.payload.school;
  const rawLogoUrl = (school.favicon_url || school.faviconurl || school.logo_url || school.logourl || school.logoUrl) as string;
  let logoUrl = resolveImageUrl(rawLogoUrl) || '/assets/images/icon.png';

  // Ensure absolute URL for fetch
  if (!logoUrl.startsWith('http')) {
    // We use eddesk.in as the base for internal assets
    logoUrl = `https://www.eddesk.in${logoUrl.startsWith('/') ? '' : '/'}${logoUrl}`;
  }

  // Fetch the image and convert to base64 to ensure Satori can render it
  let base64Image = '';
  let contentType = 'image/png';
  try {
    const response = await fetch(logoUrl);
    if (response.ok) {
      const buffer = await response.arrayBuffer();
      contentType = response.headers.get('content-type') || 'image/png';
      base64Image = `data:${contentType};base64,${Buffer.from(buffer).toString('base64')}`;
    }
  } catch (error) {
    console.error('[Icon Generation] Failed to fetch logo:', logoUrl, error);
    // Fallback to a very simple colored square if everything fails
    return new ImageResponse(
      <div style={{ background: '#4f46e5', width: '100%', height: '100%' }} />,
      { width: 96, height: 96 }
    );
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
          src={base64Image}
          style={{
            maxWidth: '100%',
            maxHeight: '100%',
            objectFit: 'contain',
          }}
        />
      </div>
    ),
    {
      width: 96,
      height: 96,
    }
  );
}

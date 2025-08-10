// Vercel serverless function to extract photos from Google Photos albums
const cheerio = require('cheerio');

export default async function handler(req, res) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  try {
    const { albumUrl } = req.query;
    
    if (!albumUrl) {
      return res.status(400).json({ error: 'Album URL is required' });
    }

    console.log('Fetching album:', albumUrl);

    // Fetch the Google Photos album page
    const response = await fetch(albumUrl, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
      }
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const html = await response.text();
    const $ = cheerio.load(html);

    // Extract photo URLs from the page
    const photos = [];
    
    // Look for image URLs in various places where Google Photos stores them
    $('img').each((i, elem) => {
      const src = $(elem).attr('src');
      if (src && src.includes('googleusercontent.com')) {
        // Convert to high quality URL
        const highQualityUrl = src
          .replace(/=w\d+-h\d+/, '=w2048-h2048')
          .replace(/=s\d+/, '=w2048-h2048');
        
        if (!photos.includes(highQualityUrl)) {
          photos.push(highQualityUrl);
        }
      }
    });

    // Also check for URLs in script tags and data attributes
    $('script').each((i, elem) => {
      const scriptContent = $(elem).html();
      if (scriptContent) {
        // Look for image URLs in JavaScript
        const urlMatches = scriptContent.match(/https:\/\/lh\d+\.googleusercontent\.com\/[^"'\s]+/g);
        if (urlMatches) {
          urlMatches.forEach(url => {
            const cleanUrl = url
              .replace(/=w\d+-h\d+/, '=w2048-h2048')
              .replace(/=s\d+/, '=w2048-h2048');
            if (!photos.includes(cleanUrl)) {
              photos.push(cleanUrl);
            }
          });
        }
      }
    });

    console.log(`Found ${photos.length} photos in album`);

    return res.status(200).json({
      success: true,
      albumUrl,
      photos,
      count: photos.length
    });

  } catch (error) {
    console.error('Error fetching album:', error);
    return res.status(500).json({
      success: false,
      error: error.message
    });
  }
}

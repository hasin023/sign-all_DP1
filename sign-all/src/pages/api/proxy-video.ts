// pages/api/proxy-video.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import https from 'https';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'GET') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    const { url } = req.query;

    if (!url || typeof url !== 'string') {
        return res.status(400).json({ error: 'URL is required' });
    }

    try {
        // Make a HEAD request first to get content info
        const checkRequest = new Promise((resolve, reject) => {
            https.request(
                url,
                { method: 'HEAD' },
                (response) => {
                    resolve(response.headers['content-type']);
                }
            ).on('error', reject).end();
        });

        const contentType = await checkRequest;

        // Now stream the video
        https.get(url, (stream) => {
            // Set headers
            res.setHeader('Content-Type', contentType || 'video/mp4');

            // Handle range requests for video seeking
            if (req.headers.range) {
                const range = req.headers.range;
                const contentLength = stream.headers['content-length'];

                if (contentLength && range) {
                    const parts = range.replace(/bytes=/, '').split('-');
                    const start = parseInt(parts[0], 10);
                    const end = parts[1] ? parseInt(parts[1], 10) : parseInt(contentLength) - 1;
                    const chunksize = (end - start) + 1;

                    res.writeHead(206, {
                        'Content-Range': `bytes ${start}-${end}/${contentLength}`,
                        'Accept-Ranges': 'bytes',
                        'Content-Length': chunksize,
                        'Content-Type': contentType || 'video/mp4',
                    });

                    stream.pipe(res);
                }
            } else {
                // Non-range requests
                stream.pipe(res);
            }
        }).on('error', (err) => {
            console.error('Proxy error:', err);
            res.status(500).json({ error: 'Failed to proxy video' });
        });

    } catch (error) {
        console.error('Proxy error:', error);
        res.status(500).json({ error: 'Failed to proxy video' });
    }
}

export const config = {
    api: {
        responseLimit: false,
        bodyParser: false,
    },
};
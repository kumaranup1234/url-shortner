const axios = require('axios');
const cheerio = require('cheerio');

const fallbackMeta = {
    'linkedin.com': {
        title: 'LinkedIn',
        logo: 'https://fontawesome.com/icons/linkedin?f=brands&s=solid'
    },
    'github.com': {
        title: 'GitHub',
        logo: 'https://github.githubassets.com/favicons/favicon.svg'
    },
    'instagram.com': {
        title: 'Instagram',
        logo: 'https://www.instagram.com/static/images/ico/favicon-192.png/68d99ba29cc8.png'
    },
    'facebook.com': {
        title: 'Facebook',
        logo: 'https://www.facebook.com/favicon.ico'
    },
    'twitter.com': {
        title: 'Twitter (X)',
        logo: 'https://abs.twimg.com/favicons/twitter.2.ico'
    },
    'youtube.com': {
        title: 'YouTube',
        logo: 'https://www.youtube.com/s/desktop/fe2e6cf2/img/favicon.ico'
    }
};

async function extractData(url) {
    try {
        const response = await axios.get(url, {
            headers: { 'User-Agent': 'Mozilla/5.0' }
        });
        const $ = cheerio.load(response.data);

        const title = $('title').text() || 'No title found';

        const favicon = $('link[rel="icon"]').attr('href');
        let logo = favicon || '';

        if (logo && !logo.startsWith('http')) {
            const baseUrl = new URL(url);
            logo = logo.startsWith('/')
                ? `${baseUrl.origin}${logo}` // absolute path from root
                : `${baseUrl.href}${logo}`; // relative path from the current directory
        }
        return { title, logo };
    } catch (error) {
        console.error(`Error fetching metadata for ${url}:`, error.message);

        //Fallback based on domain
        let fallback = { title: 'No title found', logo: 'No logo found' };
        try {
            const domain = new URL(url).hostname.replace('www.', '');
            if (fallbackMeta[domain]) {
                fallback = fallbackMeta[domain];
            }
        } catch (_) {
            //URL parsing failed, use default fallback
        }

        return fallback;
    }
}

module.exports = {
    extractData
};
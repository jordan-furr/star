// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  css: ['~/style.css'],

  app: {
    head: {
      // Every page was rendering with an empty <title> and no lang, so tabs and
      // search results showed the bare URL and screen readers had to guess.
      title: 'STAR Laces',
      htmlAttrs: { lang: 'en' },
      meta: [
        {
          name: 'description',
          content:
            'STAR Laces demands celebration and recognition of Trans individuals, ' +
            'using fashion to elevate Trans voices. 10% of sales are donated ' +
            'directly to Trans individuals.',
        },
      ],
      link: [
        // Fonts are loaded here rather than via @import in style.css: an @import
        // is a chained blocking request (the browser has to download and parse
        // style.css before it even discovers the font stylesheet).
        { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' },
        // Only Rubik 400 is used (h3 and h6); body copy is Arial.
        {
          rel: 'stylesheet',
          href: 'https://fonts.googleapis.com/css2?family=Rubik:wght@400&display=swap',
        },
      ],
    },
  },

  routeRules: {
    // Image filenames are stable, so keep this short enough that replacing a
    // photo in place still rolls out within a week. Bump the width suffix or
    // rename the file if you need an immediate change.
    '/img/**': { headers: { 'cache-control': 'public, max-age=604800' } },
  },
})

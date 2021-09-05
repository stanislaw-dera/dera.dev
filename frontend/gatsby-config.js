require("dotenv").config({
  path: `.env.${process.env.NODE_ENV}`,
})

module.exports = {
  siteMetadata: {
    siteUrl: "https://www.yourdomain.tld",
    title: "Stanisław Dera",
  },
  plugins: [
    "gatsby-plugin-styled-components",

    // fonts
    {
      resolve: `gatsby-plugin-google-fonts`,
      options: {
        fonts: [
          `Nunito\:400,400i,500`
        ],
        display: 'swap'
      }
    },

    // Connection with back end
    {
      resolve: "gatsby-source-strapi",
      options: {
        apiURL: process.env.STRAPI_URL,
        collectionTypes: [
          "posts",
          "categories",
          "tags"
        ],
        singleTypes: ["author"],
        queryLimit: 1000,
      },
    },

    // GatsbyImage
    `gatsby-plugin-image`,
    `gatsby-plugin-sharp`,
    `gatsby-transformer-sharp`,

    'gatsby-plugin-react-helmet',

    // Analytics
    {   
      resolve: `gatsby-plugin-google-gtag`,
      options: {

        trackingIds: [
          process.env.ANALYTICS_ID, // Google Analytics / GA
        ],

        pluginConfig: {
          head: true,
          respectDNT: true,
        },
      },
    },

  ],
};

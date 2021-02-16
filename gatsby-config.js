require("dotenv").config()

module.exports = {
  siteMetadata: {
    title: `🗽 Shopify Store`,
    description: `Learning Gatsbyjs`,
    author: `@sam`,
  },
  plugins: [
    {
      resolve: `gatsby-source-shopify`,
      options: {
        // The domain name of your Shopify shop.
        shopName: process.env.SHOP_NAME,

        // The storefront access token
        accessToken: process.env.STOREFRONT_API_TOKEN,
        verbose: true,
        paginationSize: 25,
        apiVersion: `2021-01`,
        includeCollections: ["shop", "content"],
      },
    },
    `gatsby-plugin-material-ui`,
    `gatsby-plugin-react-helmet`,
    `gatsby-plugin-sass`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `🗽 Shopify Store`,
        short_name: `Demo project`,
        start_url: `/`,
        background_color: `#663399`,
        theme_color: `#663399`,
        display: `minimal-ui`,
        icon: `src/images/gatsby-icon.png`, // This path is relative to the root of the site.
      },
    },
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    // `gatsby-plugin-offline`,
  ],
}

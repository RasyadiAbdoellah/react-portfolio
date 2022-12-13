module.exports = {
  siteMetadata: {
    title: "Rasyadi Abdoellah - Web Developer/Designer",
    description: "Designer turned developer with a love for building thoughtful, intuitive experiences."
  },
  plugins: [
    "gatsby-plugin-root-import",
    "gatsby-plugin-react-helmet",
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        "name": "pages",
        "path": "./src/pages/"
      },
      __key: "pages"
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `workHistory`,
        path: `${__dirname}/src/md/history`,
      },
    },
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        plugins: [
          {
            resolve: `gatsby-remark-external-links`,
            options: {
              target: "_blank",
            },
          },
        ],
      },
    },
    {
      resolve: `gatsby-plugin-mdx`,
      options: {
        gatsbyRemarkPlugins: [
          {
            resolve: `gatsby-remark-external-links`,
            options: {
              target: "_blank",
            },
          },
        ],
      },
    },
  ],
}
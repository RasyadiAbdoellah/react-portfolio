module.exports = {
  siteMetadata: {
    title: "Rasyadi Abdoellah - Web Developer/Designer",
    description: "Designer turned developer with a love for building thoughtful, intuitive experiences."
  },
  plugins: [
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `projects`,
        path: `${__dirname}/src/md/projects`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `workHistory`,
        path: `${__dirname}/src/md/history`,
      },
    },
    'gatsby-transformer-remark',
  ],
}
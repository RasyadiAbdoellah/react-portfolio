module.exports = {
  siteMetadata: {
    title: "Rasyadi Abdoellah - Web Developer/Designer",
    description: "Designer turned developer with a love for building thoughtful, intuitive experiences."
  },
  plugins: [
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `markdown`,
        path: `${__dirname}/src/md`,
      },
    },
    'gatsby-transformer-remark',
  ],
}
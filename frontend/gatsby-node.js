const path = require(`path`)

exports.createPages = async ({ graphql, actions }) => {

  const { data } = await graphql(`
    {
        allStrapiPosts {
          edges {
            node {
              slug
            }
          }
        }
    }
    `)

  data.allStrapiPosts.edges.forEach(edge => {
    actions.createPage({
      path: '/post/' + edge.node.slug,
      component: path.resolve('./src/templates/post.js'),
      context: { slug: edge.node.slug }
    })
  })

}
const { createFilePath } = require(`gatsby-source-filesystem`);
const path = require('path');

// para adicionar o campo slug no
exports.onCreateNode = ({ node, getNode, actions }) => {
  const { createNodeField } = actions;
  // Garante que estamos processando apenas arquivos markdown
  if (node.internal.type === 'MarkdownRemark') {
    // Queremos que seja basicamente o nome do post, site.com/my-slug
    const slug = createFilePath({
      node,
      getNode,
      basePath: 'pages',
    });

    // Cria um novo campo com o nome 'slug'
    createNodeField({
      node,
      name: 'slug',
      value: `/${slug.slice(12)}`,
      // vai vir tudo ex: 2015-01-03-my-first-post
      // e não queremos a data então começamos a partir do char 12
    });
  }
};

exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions;
  // fazer a busca para criar as páginas
  // pode ser uma query não nomeada
  return graphql(`
    {
      allMarkdownRemark(sort: { order: DESC, fields: frontmatter___date }) {
        edges {
          node {
            frontmatter {
              background
              category
              date(locale: "pt-br", formatString: "DD [de] MMMM [de] YYYY")
              description
              title
            }
            timeToRead
            wordCount {
              words
            }
            fields {
              slug
            }
          }
        }
      }
    }
  `).then(result => {
    const posts = result.data.allMarkdownRemark.edges;

    // ele é assincrono, dentro do array pego um post (um node)
    posts.forEach(({ node }) => {
      createPage({
        path: node.fields.slug, // ex my-first-post
        // path pegar apartir do projeto, normalizar para não ter confusão de pasta
        component: path.resolve(`./src/templates/blog-post.js`),
        context: {
          // pegar qualquer dado como title ou timetoread, mas queremos o slug
          slug: node.fields.slug,
        },
      });
    });

    const postPerPage = 6;
    // arredondar para um numero maior
    const numPages = Math.ceil(posts.length / postPerPage);

    // criar um array com o numero de pagina que vamos ter
    Array.from({ length: numPages }).forEach((_, index) => {
      createPage({
        path: index === 0 ? '/' : `/page/${index + 1}`,
        component: path.resolve(`./src/templates/blog-list.js`),
        context: {
          // passar para o graphql essas variaveis
          limit: postPerPage,
          skip: index * postPerPage, // página index é 2, 2 * 6(limit) = skip 12, pegar apartir do 12
          numPages,
          currentPage: index + 1,
        },
      });
    });
  });
};

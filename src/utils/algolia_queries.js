// query pega todos os nossos posts
// objectID: id necessario pro algolia identificar cada post
// excerpt(pruneLength: 5000) pegar um pedaço do conteudo
const postQuery = `{
  posts: allMarkdownRemark(sort: { fields: frontmatter___date, order: DESC }){
    edges {
      node {
        objectID: id
        fields {
          slug
        }
        frontmatter {
          title
          category
          date_timestamp: date
          date(locale: "pt-br", formatString: "DD [de] MMMM [de] YYYY")
          description
        }
        excerpt(pruneLength: 5000)
      }
    }
  }
}`;

// metodo recebe array, para transformar
const flatten = arr =>
  arr.map(({ node: { frontmatter, ...rest } }) => ({
    ...frontmatter, // desctruturar invéz de usar frontmatter.title lá no algolia
    date_timestamp: parseInt(
      (new Date(frontmatter.date_timestamp).getTime() / 1000).toFixed(0),
      10
    ),
    ...rest,
  }));

// ele vai separar cada vez que eu pesquisar de 20 em 20
// não vai pegar tudo de uma vez
const settings = { attributesToSnippet: [`excerpt:20`] };

// transformer => transformar nosso post para o algolia
const queries = [
  {
    query: postQuery,
    transformer: ({ data }) => flatten(data.posts.edges),
    indexName: `Posts`,
    settings,
  },
];

module.exports = queries;

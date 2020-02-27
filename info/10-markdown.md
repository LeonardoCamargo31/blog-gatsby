[data][slug] - 2015-01-03-my-first-post.md

## Front matter

Antes de adicionar a informação, com o post, consigo colocar alguns dados importantes. Por exemplo nosso post precisa receber o slug, category, title, entre outras coisas.


``` 
---
date: 2015-01-03 05:54:23
title: My first post
description: Any description whatsoever
category: Misc
background: "#7AAB13"
---

Nosso conteudo do post

```

## Adicionando o plugin para trabalhar com markdown

Plugin responsavel por pegar esse markdown e jogar para o nosso graphQL

```
yarn add gatsby-transformer-remark
```

E configuramos no gatsby-config.js

Para ler essa pasta posts
```
{
  resolve: `gatsby-source-filesystem`,
  options: {
    name: `posts`,
    path: `${__dirname}/posts`,
  },
}
```
Configurar esse novo plugin, em plugins, e esses que são true, podemos remover
```
plugins: [
  {
    resolve: `gatsby-transformer-remark`,
    options: {
      // CommonMark mode (default: true)
      commonmark: true,
      // Footnotes mode (default: true)
      footnotes: true,
      // Pedantic mode (default: true)
      pedantic: true,
      // GitHub Flavored Markdown mode (default: true)
      gfm: true,
      // Plugins configs
      plugins: [],
    },
  },
]
```


## Pegando os dados

Lá no nosso GraphiQL, podemos ver uma nova informação `allMarkdownRemark` e `markdownRemark`.

- allMarkdownRemark - Vai pegar todos os posts
- markdownRemark - Vai pegar um post só

Quando temos arrays ele chama de `edges`, e para cada item desse array ele chama de `node`, e dentro do node temos o `front matter`, então temos a query: 

```
query MyQuery {
  allMarkdownRemark {
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
      }
    }
  }
}
```
Ele já nos da o tempo de leitura, quantas palavras temos, entre outras coisas.

## Trabalhando com data

Ele te da algumas informações, como:

- difference: A diferença da data, da data atual
- formatString: Data no formato que queremos, como dd-mm-yyyy
- fromNow: Quando tempo já passou, como 2 dias, 3 dias
- locale: É a lingua da data que vamos colocar


## Apis node do gatsby

Dentro do arquivo gatsby-node.js, é onde trabalhamos com as apis do gatsby, seja para criar páginas, criar novos campos, tudo que for tratar na geração de dados mais especificos dentro do gatsby.

O Gatsby oferece aos plugins e construtores de sites muitas APIs para controlar os dados do seu site na camada de dados GraphQL.

### Plug-ins assíncronos

Se o seu plug-in executar operações assíncronas (E / S de disco, acesso ao banco de dados, chamar APIs remotas etc.), você deve retornar uma promise ou o uso de callback.

Se o seu plug-in não funciona de forma assíncrona, você pode simplesmente retornar diretamente.

Para mais informações: https://www.gatsbyjs.org/docs/node-apis/

### createPages

Diga aos plugins para adicionar páginas, esse ponto é chamado somente após a conclusão da origem e transformação dos nodes, além da criação do esquema GraphQL, para que você possa consultar seus dados para criar páginas.

```
const path = require(`path`)

exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions
  const blogPostTemplate = path.resolve(`src/templates/blog-post.js`)
  // Consulta os node para usar na criação de páginas.
  // Você pode consultar os dados para os quais deseja criar páginas
  // produtos, itens do portfólio, páginas de destino etc.
  // Variáveis podem ser adicionadas como o segundo parâmetro da função
  // exemplo loadPagesQuery ($limit: Int!)
  return graphql(`
    query loadPagesQuery ($limit: Int!) {
      allMarkdownRemark(limit: $limit) {
        edges {
          node {
            frontmatter {
              slug
            }
          }
        }
      }
    }
  `, { limit: 1000 }).then(result => {
    if (result.errors) {
      throw result.errors
    }
    // depois de resolver essa promise
    // Crie páginas de postagem no blog.
    result.data.allMarkdownRemark.edges.forEach(edge => {
      createPage({
        // Caminho para esta página - obrigatório
        path: `${edge.node.frontmatter.slug}`,
        component: blogPostTemplate,
        context: {
          // Adicione dados de contexto opcionais a serem inserido
          // como props no componente da página
          //
          // Os dados de contexto também podem ser usados como
          // argumentos para a página GraphQL query.
          //
          // A página "path" está sempre disponível como um GraphQL
          // argumento.
          //
          //ex: slug: node.fields.slug,
        },
      })
    })
  })
}
```

Depois no nosso componente
```
const BlogPost = props => {
  const post = props.data.markdownRemark; // markdownRemark: um unico post

  return (
    <>
      <h1>Title: {post.frontmatter.title}</h1>
      <div dangerouslySetInnerHTML={{ __html: post.html }} />
    </>
  );
};
// dangerouslySetInnerHTML para inserir hrml no react, é como o innerHtml

// fazer busca passando variavel
// pois queremos somente um determinado um post
export const query = graphql`
  query Post($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      frontmatter {
        title
      }
      html
    }
  }
`;
```

### onCreateNode

Vamos usar o onCreateNode, que basicamente ele é chamado toda vez que um novo nó é criado, no nosso caso um novo post.


```
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

    // Transforme o novo node aqui e crie um novo node ou
    // cria um novo node field.

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
```

Depois de configurar, dentro de fields teremos o nosso campo slug

```
query PostList {
  allMarkdownRemark {
    edges {
      node {
        ...
        fields {
          slug
        }
      }
    }
  }
}
```


## Ordenação
```
allMarkdownRemark(sort: { order: DESC, fields: frontmatter___date }) {}
```

## Paginação

- Teremos 5 posts (limit 5) por página (skip 0)
- Página 2 (skip 5)
- Página 3 (skip 10)

```
allMarkdownRemark(sort: {...}, limit: 5, skip: 0) {...}
```
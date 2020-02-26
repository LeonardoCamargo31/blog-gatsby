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

### Trabalhando com data

Ele te da algumas informações, como:

- difference: A diferença da data, da data atual
- formatString: Data no formato que queremos, como dd-mm-yyyy
- fromNow: Quando tempo já passou, como 2 dias, 3 dias
- locale: É a lingua da data que vamos colocar


### Apis node do gatsby

Dentro do arquivo gatsby-node.js, é onde trabalhamos com as apis do gatsby, seja para criar páginas, criar novos campos, tudo que for tratar na geração de dados mais especificos dentro do gatsby.


Para mais informações: https://www.gatsbyjs.org/docs/node-apis/

Vamos usar o onCreateNode, que basicamente ele é chamado toda vez que um novo nó é criado, no nosso caso um novo post.

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

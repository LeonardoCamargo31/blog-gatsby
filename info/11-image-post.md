Configurar para que o remark trabalhe com o gastby-images

- <b>gatsby-remark-images</b>: vai fazer a conexão do gastby-images com o remark.
- <b>gatsby-remark-relative-images</b>: importante pois vamos utilizar o nestifly cms, ele converte o source da imagem para que fique na pasta correta.
- <b>gatsby-remark-lazy-load</b>: para fazer o lazy-load das imagens, carregar quando estiver proximo, ao invés de carregar todas de uma vez.
- <b>lazysizes</b>: o gatsby-remark-lazy-load necessita dessa biblioteca.

```
yarn add gatsby-remark-images@3.1.12 gatsby-remark-relative-images@0.2.3  gatsby-remark-lazy-load@1.0.1  lazysizes@5.1.1
```

Dentro da pasta `/static` ficaram nossas imagens

Configura o plugin

```
plugins:[
  //precisa ser o primeiro a trabalhar com gatsby-remark-images
  {
    resolve: `gatsby-source-filesystem`,
    options: {
      name: `uploads`,
      path: `${__dirname}/static/assets/img`,
    },
  },
]
```
E no plugin remark

```
{
  resolve: `gatsby-transformer-remark`,
  options: {
    plugins: [],
    plugins: [
      {
        resolve: "gatsby-remark-relative-images",
        options: {
          name: "uploads",
        },
      },
      {
        resolve: "gatsby-remark-images",
        options: {
          maxWidth: 960,
          linkImagesToOriginal: false,
        },
      },
      `gatsby-remark-lazy-load`,
    ],
  },
}
```

## gatsby-browser
O gatsby-browser serve para importar bibliotecas, para lidar com coisas de js que queremos fazer fora do react, para mais informações https://www.gatsbyjs.org/docs/browser-apis/

```
// devemos importar o lazysizes aqui
import 'lazysizes';
```

### Chamando a imagem no markdown
```
// [alt](file)
![Desert](/assets/img/desert.jpg)
```
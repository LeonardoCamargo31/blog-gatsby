## Iniciando

Para instalar o gatsby
```
npm i -g gatsby-cli
```

Agora podemos criar o projeto
```
gatsby new blog-gatsby
```

Feito isso ele ira criar a pasta `/blog-gatsby`, e temos uma estrutura de algumas pastas. Alguns comandos do gatsby:
```
gatsby develop // iniciar o servidor e ficar assistindo as atualizações
gatsby build // responsavel por gerar os arquivos estáticos
gatsby clean //limpar todos assets e cache que o gatsby gera
```

## Estrutura do projeto

`gatsby-config.js` responsável por fazer toda a configuração do gatsby com plugins e outros dados.

`gatsby-browser.js` onde vamos passar toda variavel ou biblioteca que queremos trabalhar no front-end, então por exemplo se quiser trabalhar com alguma biblioteca de modal, lazy-load, ao invés de fazer um import em algum arquivo, fazermos dentro desse arquivo.

`gatsby-node.js` serve para trabalharmos com a API do gatsby, basicamente todo conjunto de dados do gatsby vai ser passado por esse arquivo, ou seja um post do blog, vão ficar aqui.

`gatsby-ssr.js` serve para trabalhar com Server Side Render, ou seja se precisar renderizar algo no servidor vamos usar esse arquivo.


`/src/components` onde fica nossos componentes.

`/src/img` onde fica nossas imagens.

`/src/pages` onde criamos uma nova página.

`/public` onde fica os arquivos gerados.
Depois de criar o indice

Devemos adicionar novos dados para a busca, nós vamos fazer através do plugin do gatsby, através do plugin

Tivemos um problema, a contrução do blog, toda vez que fazemos uma operação de build ele apagava todos os indices e criava tudo novamente. O algolia possui uma limitação, e estavamos gerando muitas operações.

Um cara então fez um plugin, qua não cria um novo indice e atualiza somente o necessario, fazendo mais operações o plugin `gatsby-plugin-algolia-search`


Basicamente enviamos os dados para o nosso indice no algolia, e para conseguirmos passar esses dados para o algolia, temos que fazer as queries no graphQl assim como fizemos para o resto do nosso conteudo.

E para indexar no algolia, rodamos o gatsby build
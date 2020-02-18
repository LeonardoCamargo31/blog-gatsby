## Motivação

- <b>Critical css automatico</b>, ele vai injetar somente os estilos daquela página e nada mais.

- <b>Não tem conlito de classes</b>, de ter uma classe, e depois criar outra com o mesmo nome, e conflito de classe.

- Dentro do styled component, se o component não esta sendo usado, e aquele css não é necessario, assim podemos saber <b>facilmente se o css é usado ou não</b>. 

- Criar style dinamico, consigo mudar diferentes coisas, baseado nas props.

- Simples manutenção, por ser componentizado.

- Prefixing automatico.

## Instalação

```
yarn add styled-components
yarn add gatsby-plugin-styled-components
```

Vou no `gatsby-config.js` e adiciono esse novo plugin.
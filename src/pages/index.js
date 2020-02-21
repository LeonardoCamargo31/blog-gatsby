import React from 'react';
// 1 - alem de não dar o refresh, e manter aquele padrão de usabilidade de um spa
// 2 - no hover ele já vai carregar os dados em segundo plano, fazendo um 'prefetch' da outra página
// assim quando a pessoa clicar vai abri muito rápido
// 3 - activeStyle página que estou ativo
// import { Link } from 'gatsby';

import Layout from '../components/Layout';
import SEO from '../components/seo';
import PostItem from '../components/PostItem';

const IndexPage = () => (
  <Layout>
    <SEO title="Home" />
    <PostItem
      slug="/about/"
      category="Misc"
      date="30 de Julho de 2019"
      timeToRead="5"
      title="Diga não ao Medium: tenha sua própria plataforma"
      description="Algumas razões para você ter sua própria plataforma ao invés de soluções como o Medium."
    />
  </Layout>
);

export default IndexPage;

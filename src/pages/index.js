import React from 'react'
// 1 - alem de não dar o refresh, e manter aquele padrão de usabilidade de um spa
// 2 - no hover ele já vai carregar os dados em segundo plano, fazendo um 'prefetch' da outra página
// assim quando a pessoa clicar vai abri muito rápido
// 3 - activeStyle página que estou ativo

import {Link} from 'gatsby'

import Layout from '../components/layout'
import SEO from '../components/seo'

const IndexPage = () => (
  <Layout>
    <SEO title='Home' />
    <h1>Home</h1> 
    <ul>
      <li>
        <Link to='/' activeStyle={{color:'red'}}>Home</Link>
      </li>
      <li>
        <Link to='/about'>About</Link>
      </li>
    </ul>
  </Layout>
)

export default IndexPage

import React from "react"
import {Link} from 'gatsby'
import Layout from '../components/layout'
import SEO from '../components/seo'

// com () não precisamos da palavra return ex = () => { return true }
const AboutPage = ()=>(
  <Layout>
    <SEO title='About' />
      <h1>AboutPage</h1>
      <ul>
          <li>
              <Link to='/'>Home</Link>
          </li>
          <li>
              <Link to='/about' activeStyle={{color:'red'}}>About</Link>
          </li>
      </ul>
  </Layout>
)
export default AboutPage
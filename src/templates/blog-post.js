import React from 'react';
import { graphql } from 'gatsby';

import * as S from '../components/Post/styled';

import Layout from '../components/Layout';
import SEO from '../components/seo';

import RecommendedPosts from '../components/RecommendedPosts';
import Comments from '../components/Comments';

// o useStaticQuery não aceita parâmetros para rodar as queries
// só queries estáticas
const BlogPost = props => {
  // data resultado da query
  // dados pageContext, vem do contexo em gatsby-node.js
  const post = props.data.markdownRemark; // markdownRemark: um unico post
  // dados que vem do contexto pageContext
  const next = props.pageContext.nextPost;
  const previous = props.pageContext.previousPost;

  return (
    <Layout>
      <SEO title={post.frontmatter.title} />
      <S.PostHeader>
        <S.PostDate>
          {post.frontmatter.date} • {post.timeToRead} min de leitura
        </S.PostDate>
        <S.PostTitle>{post.frontmatter.title}</S.PostTitle>
        <S.PostDescription>{post.frontmatter.description}</S.PostDescription>
      </S.PostHeader>
      <S.MainContent>
        <div dangerouslySetInnerHTML={{ __html: post.html }} />
      </S.MainContent>
      <RecommendedPosts next={next} previous={previous} />
      <Comments url={post.fields.slug} title={post.frontmatter.title} />
    </Layout>
  );
};
// dangerouslySetInnerHTML para inserir hrml no react, é como o innerHtml

// preciso chamar os dados via graphQL, e exportar para nossa tela
// e nosso componente recebe os dados como data, exemplo:
// const BlogPost = props => { props.data ...

// fazer busca passando variavel
// pois queremos somente um determinado um post
export const query = graphql`
  query Post($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      fields {
        slug
      }
      frontmatter {
        title
        description
        date(locale: "pt-br", formatString: "DD [de] MMMM [de] YYYY")
      }
      html
      timeToRead
    }
  }
`;

export default BlogPost;

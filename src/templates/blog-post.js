import React from 'react';
import { graphql } from 'gatsby';

// o useStaticQuery não aceita parâmetros para rodar as queries
// só queries estáticas
const BlogPost = ({ data }) => {
  const post = data.markdownRemark; // markdownRemark: um unico post

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

export default BlogPost;

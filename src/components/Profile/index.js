import React from 'react';
import { useStaticQuery, graphql } from 'gatsby';
import Avatar from '../Avatar'

const Profile = () => {
  const {
    site: {
      siteMetadata: { title, position, description },
    },
  } = useStaticQuery(graphql`
    query mySiteData {
      site {
        siteMetadata {
          title
          description
        }
      }
    }
  `);

  return (
    <div className="profile-wrapper">
      <Avatar/>
      <h1>{title}</h1>
      <h1>{position}</h1>
      <p>{description}</p>
    </div>
  );
};

export default Profile;

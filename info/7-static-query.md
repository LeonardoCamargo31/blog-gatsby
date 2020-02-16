```
import React from 'react';
import { StaticQuery, graphql } from 'gatsby';

const Profile = () => (
  <StaticQuery
    query={graphql`
      query mySiteData {
        site {
          siteMetadata {
            title
            description
          }
        }
      }
    `}
    render={({
      site: {
        siteMetadata: { title, position, description },
      },
    }) => (
      <div className="profile-wrapper">
        <h1>{title}</h1>
        <h1>{position}</h1>
        <p>{description}</p>
      </div>
    )}
  />
);

export default Profile;
```

Com o StaticQuery, que é componente react, tratamos a consulta e renderização tudo no mesmo cara:

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

Com o useStaticQuery, que é um hook do react, dividimos uma busca e depois renderizamos

```
import React from 'react';
import { useStaticQuery, graphql } from 'gatsby';

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
      <h1>{title}</h1>
      <h1>{position}</h1>
      <p>{description}</p>
    </div>
  );
};

export default Profile;
```
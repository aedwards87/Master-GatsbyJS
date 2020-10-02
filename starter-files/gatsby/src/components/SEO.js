/* eslint-disable arrow-body-style */
import React from 'react';
import { graphql, useStaticQuery } from 'gatsby';
import { Helmet } from 'react-helmet';

const SEO = ({ children, location, description, title, image }) => {
  const { site } = useStaticQuery(graphql`
    query {
      site {
        siteMetadata {
          title
          description
          twitter
        }
      }
    }
  `);

  return (
    <Helmet
      titleTemplate={
        title ? `%s - ${site.siteMetadata.title}` : site.siteMetadata.title
      }
    >
      <html lang="en" />
      <title>{title || site.siteMetadata.title}</title>
      <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
      <link rel="alternate icon" href="/favicon.ico" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta charSet="utf-8" />
      <meta name="description" content={site.siteMetadata.description} />
      {location && <meta property="og:url" content={location.href} />}
      <meta property="og:image" content={image || '/logo.svg'} />
      <meta property="og:title" content={title} key="ogtitle" />
      <meta
        property="og:site_name"
        content={site.siteMetadata.title}
        key="ogsitename"
      />
      <meta property="og:description" content={description} key="ogdesc" />
      {children}
      {/* We add the children in here, so if you ever need to pass in any more properties from elsewhere, you can. E.g. you wanted to override the title tag 
        <SEO>
          <title>New overriding title</title>
        </SEO>
      */}
    </Helmet>
  );
};

export default SEO;

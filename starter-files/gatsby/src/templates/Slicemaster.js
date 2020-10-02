/* eslint-disable arrow-body-style */
import React from 'react';
import Img from 'gatsby-image';
import { graphql } from 'gatsby';
import SEO from '../components/SEO';

const Slicemaster = ({ data: { slicemaster } }) => {
  return (
    <>
      <SEO
        title={`Slicemaster - ${slicemaster.name}`}
        image={slicemaster.image?.asset?.fluid?.src}
      />
      <div className="center">
        <Img fluid={slicemaster.image.asset.fluid} alt={slicemaster.name} />
        <h2 style={{ transform: 'rotate(2deg)', marginTop: -18 }}>
          <span className="mark">{slicemaster.name}</span>
        </h2>
        <p>{slicemaster.description}</p>
      </div>
    </>
  );
};

export const SliceMastersCompenentQuery = graphql`
  query SliceMastersCompenentQuery($slug: String!) {
    slicemaster: sanityPerson(slug: { current: { eq: $slug } }) {
      id
      name
      description
      image {
        asset {
          fluid(maxWidth: 1000, maxHeight: 720) {
            ...GatsbySanityImageFluid
          }
        }
      }
      slug {
        current
      }
    }
  }
`;

export default Slicemaster;

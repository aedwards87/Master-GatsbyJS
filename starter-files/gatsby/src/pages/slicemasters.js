import { graphql, Link } from 'gatsby';
/* eslint-disable arrow-body-style */
import Img from 'gatsby-image';
import React from 'react';
import styled from 'styled-components';
import Pagination from '../components/Pagination';
import SEO from '../components/SEO';

const SlicemastersPage = ({ data, pageContext }) => {
  const sliceMasters = data.sliceMaster.nodes;
  console.log(sliceMasters);
  return (
    <>
      <SEO title={`Slicemasters - Page ${pageContext.currentPage || 1}`} />
      <Pagination
        pageSize={parseInt(process.env.GATSBY_PAGE_SIZE)}
        // pageSize={pageContext.pageSize}
        totalCount={data.sliceMaster.totalCount}
        currentPage={pageContext.currentPage || 1}
        skip={pageContext.skip}
        base="slicemasters"
      />
      <S.SliceMastersGrid>
        {sliceMasters.map((sliceMaster) => (
          <S.SliceMaster key={sliceMaster.id}>
            <Link to={`/slicemasters/${sliceMaster.slug.current}`}>
              <h2>
                <span className="mark">{sliceMaster.name}</span>
              </h2>
            </Link>
            <Img fluid={sliceMaster.image.asset.fluid} alt={sliceMaster.name} />
            <p className="description">{sliceMaster.description}</p>
          </S.SliceMaster>
        ))}
      </S.SliceMastersGrid>
    </>
  );
};

export const SliceMastersPageQuery = graphql`
  query SliceMastersPageQuery($skip: Int = 0, $pageSize: Int = 4) {
    sliceMaster: allSanityPerson(limit: $pageSize, skip: $skip) {
      totalCount
      nodes {
        id
        name
        description
        slug {
          current
        }
        image {
          asset {
            fluid(maxWidth: 500) {
              ...GatsbySanityImageFluid
            }
          }
        }
      }
    }
  }
`;

const S = {
  SliceMastersGrid: styled.div`
    display: grid;
    gap: 2rem;
    grid-template-columns: repeat(auto-fill, minmax(230px, 1fr));
  `,
  SliceMaster: styled.div`
    a {
      text-decoration: none;
    }
    .gatsby-image-wrapper {
      height: 400px;
    }
    h2 {
      transform: rotate(-2deg);
      text-align: center;
      margin-bottom: -2rem;
      position: relative;
      z-index: 2;
    }
    .description {
      background: var(--yellow);
      padding: 1rem;
      margin: 2rem;
      margin-top: -6rem;
      z-index: 2;
      position: relative;
      transform: rotate(1deg);
      text-align: center;
    }
  `,
};

export default SlicemastersPage;

import React from 'react';
import { graphql } from 'gatsby';
import styled from 'styled-components';
import SEO from '../components/SEO';
/* eslint-disable arrow-body-style */

const BeersPage = ({ data }) => {
  const beers = data.beers.nodes;
  return (
    <>
      <SEO title={`Beers! ${beers.length} in stock!`} />

      <h2 className="center">
        We have {beers.length} beers available. Dine in only!
      </h2>

      <S.BeerPageGrid>
        {beers.map((beer) => {
          const rating = Math.round(beer.rating.average);
          return (
            <div key={beer.id}>
              <img src={beer.image} alt={beer.name} />
              <h3>{beer.name}</h3>
              {beer.price}
              <p title={`${rating} out of 5 stars`}>
                {/* Title tag For accessibility purposes */}
                {`⭐️`.repeat(rating)}
                <span style={{ filter: `grayscale(100%)` }}>
                  {`⭐️`.repeat(5 - rating)}
                </span>
                <span> ({beer.rating.reviews})</span>
              </p>
            </div>
          );
        })}
      </S.BeerPageGrid>
    </>
  );
};

export const BeerQuery = graphql`
  query BeerQuery {
    beers: allBeer {
      nodes {
        id
        name
        price
        image
        rating {
          average
          reviews
        }
      }
    }
  }
`;

const S = {
  BeerPageGrid: styled.div`
    display: grid;
    gap: 2rem;
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
    /* grid-auto-rows: 1fr; */
    text-align: center;
    div {
      display: grid;
      justify-items: center;
      border: 1px solid var(--grey);
      padding: 2rem;
    }
    img {
      width: 100%;
      height: 200px;
      margin-bottom: 2rem;
      object-fit: contain;
      /* Below: Mostly working it's magic on the alt tag text. 
      REMEMBER: To use block or grid to ensure the image takes up the space even if doesn't load */
      display: grid;
      align-items: center;
      font-size: 10px;
    }
  `,
};

export default BeersPage;

/* eslint-disable arrow-body-style */
import React from 'react';
import { graphql, Link } from 'gatsby';
import Img from 'gatsby-image';
import styled from 'styled-components';
import SEO from '../components/SEO';

const PizzaTemplatePage = ({ data: { pizza } }) => {
  return (
    <>
      <SEO title={`${pizza.name}`} image={pizza.image?.asset?.fluid?.src} />
      <S.PizzaTemplateGrid>
        <Img fluid={pizza.image.asset.fluid} />
        <div>
          <h2 className="mark">{pizza.name}</h2>
          <p>Toppings:</p>
          <ul>
            {pizza.toppings.map((topping) => (
              <li key={topping.id}>
                <Link to={`/pizzas/topping/${topping.name}`}>
                  {topping.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </S.PizzaTemplateGrid>
    </>
  );
};

// This needs to be dynamic based on the slug passed in via context n gatsby-node.js
export const query = graphql`
  query($slug: String!) {
    pizza: sanityPizza(slug: { current: { eq: $slug } }) {
      id
      name
      image {
        asset {
          fluid(maxWidth: 800) {
            ...GatsbySanityImageFluid
          }
        }
      }
      toppings {
        id
        name
        vegetarian
      }
    }
  }
`;

const S = {
  PizzaTemplateGrid: styled.div`
    display: grid;
    gap: 2rem;
    grid-template-columns: repeat(auto-fill, minmax(400px, 1fr));
  `,
};

export default PizzaTemplatePage;

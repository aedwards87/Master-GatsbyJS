import React from 'react';
import { Link } from 'gatsby';
import Img from 'gatsby-image';
import styled from 'styled-components';

const SinglePizza = ({ pizza }) => (
  <S.SinglePizza>
    <Link to={`/pizza/${pizza.slug.current}`}>
      <h2>
        <span className="mark">{pizza.name}</span>
      </h2>
    </Link>
    <p>{pizza.toppings.map((topping) => `${topping.name}`).join(', ')}</p>
    <Img fluid={pizza.image.asset.fluid} alt={pizza.name} />
  </S.SinglePizza>
);

const PizzaList = ({ pizzas }) => (
  <S.PizzaGrid>
    {pizzas.map((pizza) => (
      <SinglePizza key={pizza.id} pizza={pizza} />
    ))}
  </S.PizzaGrid>
);

const S = {
  PizzaGrid: styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    gap: 4rem;
    grid-auto-rows: auto auto 500px;
    @media (max-width: 735px) {
      grid-auto-rows: auto auto 250px;
    }
    @media (max-width: 500px) {
      grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
    }
  `,
  SinglePizza: styled.div`
    display: grid;
    /* Take your row sizing not from the SinglePizza styled div, but from the PizzaGrid styles grid */
    @supports not (grid-template-rows: subgrid) {
      --rows: auto auto 10fr;
    }
    grid-template-rows: var(--rows, subgrid);
    grid-row: span 3;
    gap: 1rem;
    h2,
    p {
      margin: 0;
    }
    a {
      text-decoration: unset;
    }
  `,
};

export default PizzaList;

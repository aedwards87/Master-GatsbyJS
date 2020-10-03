import React from 'react';
import { graphql, Link, useStaticQuery } from 'gatsby';
import styled from 'styled-components';

// Function called from component
const countPizzasInToppings = (pizzas) => {
  // console.log(pizzas);
  const counts = pizzas
    .map((pizza) => pizza.toppings)
    .flat()
    .reduce((acc, topping) => {
      // check if this is an existing topping
      const existingTopping = acc[topping.id];
      if (existingTopping) {
        // if true incremenet by 1
        existingTopping.count += 1;
      } else {
        // otherwise create a new entry in our accumalator and set it to one
        acc[topping.id] = {
          id: topping.id,
          name: topping.name,
          count: 1,
        };
      }
      return acc;
    }, {});
  // sort them based on their count
  const sortedToppings = Object.values(counts).sort(
    (a, b) => b.count - a.count
  );
  return sortedToppings;
};

// Component starts herer
const ToppingsFilter = ({ hide = true }) => {
  // Get a list of all the toppings
  // Get a list of all the pizzas with their toppings
  const { pizzas } = useStaticQuery(graphql`
    query {
      pizzas: allSanityPizza {
        nodes {
          toppings {
            id
            name
          }
        }
      }
    }
  `);
  // Count how many pizzas are in each topping
  const toppingsCount = countPizzasInToppings(pizzas.nodes);
  // Loop over the list of toppings and display the topping and the count the number of pizzas in that topping
  // Link it up
  return (
    <S.ToppingsFilter>
      {hide && (
        <Link to="/pizzas" style={{ overflow: 'auto' }}>
          <span className="name">All</span>
          <span className="count">{pizzas.nodes.length}</span>
        </Link>
      )}
      {toppingsCount.map((topping) => (
        <Link to={`/pizzas/topping/${topping.name}`} key={topping.id}>
          <span className="name">{topping.name}</span>
          {hide && <span className="count">{topping.count}</span>}
        </Link>
      ))}
    </S.ToppingsFilter>
  );
};

const S = {
  ToppingsFilter: styled.div`
    display: flex;
    flex-wrap: wrap;
    gap: 1rem;
    margin-bottom: 4rem;
    a {
      display: grid;
      grid-template-columns: auto 1fr;
      gap: 0 1rem;
      align-items: center;
      padding: 5px;
      background: var(--grey);
      text-decoration: none;
      border-radius: 2px;
      font-size: 2rem;
      font-size: clamp(1.5rem, 2.7vw, 2rem);
      .count {
        background: white;
        padding: 2px 5px;
      }
      .active {
        background: var(--yellow);
      }
      &[aria-current='page'] {
        background: var(--yellow);
      }
      @media (max-width: 500px) {
      }
    }
  `,
};

export default ToppingsFilter;

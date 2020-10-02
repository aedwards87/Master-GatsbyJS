/* eslint-disable arrow-body-style */
import React from 'react';
import Img from 'gatsby-image';
import { graphql } from 'gatsby';
import SEO from '../components/SEO';
import useForm from '../utils/useForm';
import calculatePizzaPrice from '../utils/calculatePizzaPrice';
import formatMoney from '../utils/formatMoney';
import S from '../styles/OrderStyles';
import usePizza from '../utils/usePizza';
import PizzaOrder from '../components/PizzaOrder';
import calculateOrderTotal from '../utils/calculateOrderTotal';

const OrdersPage = ({ data }) => {
  const pizzas = data.pizzas.nodes;
  const [values, updateValues] = useForm({
    name: '',
    email: '',
    bakeBeans: '',
  });
  const {
    order,
    updateOrder,
    removeFromOrder,
    error,
    loading,
    message,
    submitOrder,
  } = usePizza({
    pizzas,
    values,
  });

  if (message) return <p>{message}</p>;

  return (
    <>
      <SEO title="Order a Pizza" />
      <S.OrderForm onSubmit={submitOrder}>
        <fieldset disabled={loading}>
          <legend>Your info</legend>
          <label htmlFor="name">Name</label>
          <input
            id="name"
            type="text"
            name="name"
            value={values.name}
            onChange={updateValues}
          />
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            name="email"
            value={values.email}
            onChange={updateValues}
          />
          <input
            id="bakeBeans"
            type="bakeBeans"
            name="bakeBeans"
            className="bakeBeans"
            value={values.bakeBeans}
            onChange={updateValues}
          />
        </fieldset>
        <fieldset disabled={loading} className="menu">
          <legend>Menu</legend>
          {pizzas.map((pizza) => (
            <S.Menu key={pizza.id}>
              <Img
                width="50"
                height="50"
                fluid={pizza.image.asset.fluid}
                alt={pizza.name}
              />
              <div>
                <h2>{pizza.name}</h2>
              </div>
              <div className="button-grid">
                {['S', 'M', 'L'].map((size) => (
                  <button
                    type="button"
                    key={size}
                    // value={formatMoney(calculatePizzaPrice(pizza.price, size))}
                    onClick={() =>
                      updateOrder({
                        id: pizza.id,
                        size,
                      })
                    }
                  >
                    {size} {formatMoney(calculatePizzaPrice(pizza.price, size))}
                  </button>
                ))}
              </div>
            </S.Menu>
          ))}
        </fieldset>
        <fieldset disabled={loading} className="order">
          <legend>Order</legend>
          <PizzaOrder
            order={order}
            pizzas={pizzas}
            removeFromOrder={removeFromOrder}
          />
        </fieldset>
        <fieldset disabled={loading}>
          <h3>
            Your Total is {formatMoney(calculateOrderTotal(order, pizzas))}
          </h3>
          <div>{error ? <p>Error: {error}</p> : ''}</div>
          <button type="submit" disabled={loading}>
            {loading ? 'Placing order...' : 'Order Ahead'}
          </button>
        </fieldset>
      </S.OrderForm>
    </>
  );
};

export const OrderPizzaQuery = graphql`
  query OrderPizzaQuery($topping: [String]) {
    pizzas: allSanityPizza(
      filter: { toppings: { elemMatch: { name: { in: $topping } } } }
    ) {
      nodes {
        id
        name
        price
        slug {
          current
        }
        image {
          asset {
            fluid(maxWidth: 100) {
              ...GatsbySanityImageFluid
            }
          }
        }
      }
    }
  }
`;

export default OrdersPage;

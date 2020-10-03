/* eslint-disable arrow-body-style */
import React from 'react';
import Img from 'gatsby-image';
import S from '../styles/OrderStyles';
import calculatePizzaPrice from '../utils/calculatePizzaPrice';
import formatMoney from '../utils/formatMoney';

const PizzaOrder = ({ order, pizzas, removeFromOrder }) => {
  return (
    <>
      {order.map((singleOrder, i) => {
        const pizza = pizzas.find((p) => p.id === singleOrder.id);
        // console.log({ `${singleOrder.id}-${pizza.price}` });
        return (
          <S.Menu key={`${singleOrder.id}-${i}`}>
            <Img fluid={pizza.image.asset.fluid} />
            <h2>{pizza.name}</h2>
            <p>
              {formatMoney(calculatePizzaPrice(pizza.price, singleOrder.size))}
            </p>
            <button
              type="button"
              className="remove"
              title={`Remove ${singleOrder.size} ${pizza.name} from order`}
              onClick={() => removeFromOrder(i)}
            >
              &times;
            </button>
          </S.Menu>
        );
      })}
    </>
  );
};

export default PizzaOrder;

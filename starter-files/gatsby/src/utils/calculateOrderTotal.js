import calculatePizzaPrice from './calculatePizzaPrice';

const calculateOrderTotal = (order, pizzas) =>
  // Loop over each item in the order
  // calculate the total for that pizza
  // add that total to the running total
  order.reduce((acc, val) => {
    const pizza = pizzas.find((p) => p.id === val.id);

    return acc + calculatePizzaPrice(pizza.price, val.size);
  }, 0);
export default calculateOrderTotal;

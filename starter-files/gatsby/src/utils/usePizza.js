import { useContext, useState } from 'react';
import OrderContext from '../components/OrderContext';
import attachNamesAndPrices from './attachNamesAndPrices';
import calculateOrderTotal from './calculateOrderTotal';
import formatMoney from './formatMoney';

const usePizza = ({ pizzas, values }) => {
  // 1. create some state to hold our order
  const [order, setOrder] = useContext(OrderContext);
  const [error, setError] = useState();
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  // 2. make a function to add things to order
  const updateOrder = (orderedPiizza) => setOrder([...order, orderedPiizza]);
  // 3. make a function to remove things from order
  const removeFromOrder = (index) => {
    setOrder([
      // ...order.filter((x) => !x.id),
      ...order.slice(0, index),
      ...order.slice(index + 1),
    ]);
  };

  // This is the function that is run when someone submits the form
  const submitOrder = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    // setMessage('Go eat');
    // Gather all the data
    const body = {
      order: attachNamesAndPrices(order, pizzas),
      total: formatMoney(calculateOrderTotal(order, pizzas)),
      name: values.name,
      email: values.email,
      bakeBeans: values.bakeBeans,
    };
    console.log(body);

    // TODO: 4. send this data to a serverless function when they check out
    const res = await fetch(
      `${process.env.GATSBY_SERVERLESS_BASE}/placeOrder`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      }
    );
    const text = JSON.parse(await res.text());

    // check if everything worked
    if (res.status >= 400 && res.status < 600) {
      setLoading(false); // turn off loading
      setError(text.message);
    } else {
      // it worked!
      setLoading(false);
      setMessage('Success! Come on down for your pizza');
    }
  };

  return {
    order,
    updateOrder,
    removeFromOrder,
    error,
    loading,
    message,
    submitOrder,
  };
};

export default usePizza;

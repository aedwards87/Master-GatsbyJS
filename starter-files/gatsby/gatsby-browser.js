import React from 'react';
import Layout from './src/components/Layout';
import { OrderProvider } from './src/components/OrderContext';

export const wrapPageElement = ({ element, props }) => (
  <Layout {...props}>{element}</Layout>
);

export const shouldUpdateScroll = ({
  routerProps: { location },
  getSavedScrollPosition,
}) => {
  // Retain scroll position when user is on the pizzas or topping page
  const pagesToRetainScollPosition =
    location.pathname.includes('pizzas' || 'topping') ||
    location.pathname.includes('topping');

  if (pagesToRetainScollPosition) {
    const currentPosition = getSavedScrollPosition(location);

    window.scrollTo(currentPosition || [0, 0]);

    return false;
  }
};

export const wrapRootElement = ({ element }) => (
  <OrderProvider>{element}</OrderProvider>
);

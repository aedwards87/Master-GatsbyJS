/* eslint-disable arrow-body-style */
import path from 'path';
import fetch from 'isomorphic-fetch';

const turnPizzasIntoPage = async ({ graphql, actions }) => {
  // 1. get a template for this page
  const pizzaTemplate = path.resolve('./src/templates/Pizza.js');
  // 2. query all pizzas
  const { data } = await graphql(`
    query PizzasQuery {
      pizzas: allSanityPizza {
        nodes {
          name
          slug {
            current
          }
        }
      }
    }
  `);
  // 3. loop over each pizza and create a page for that pzza
  data.pizzas.nodes.forEach((pizza) => {
    actions.createPage({
      // What is the URL for this new page??
      path: `pizza/${pizza.slug.current}`,
      component: pizzaTemplate,
      context: {
        slug: pizza.slug.current,
      },
    });
  });
};

const turnToppingsIntoPage = async ({ graphql, actions }) => {
  // 1. get a template for this page
  const toppingTemplate = path.resolve('./src/pages/pizzas.js');
  // 2. query all toppings
  const { data } = await graphql(`
    query ToppingsQuery {
      toppings: allSanityTopping {
        nodes {
          id
          name
        }
      }
    }
  `);
  // 3. loop over each topping and create a page for that pzza
  data.toppings.nodes.forEach((topping) => {
    actions.createPage({
      // What is the URL for this new page??
      path: `pizzas/topping/${topping.name}`,
      component: toppingTemplate,
      context: {
        topping: topping.name,
        toppingRegex: `/${topping.name}/i`,
      },
    });
  });
};

const fetchBeersAndTurnIntoNodes = async ({
  actions,
  createNodeId,
  createContentDigest,
}) => {
  // 1. Fetch a list of beers
  const result = await fetch('https://sampleapis.com/beers/api/ale');
  const beers = await result.json(); // price, name, rating and image
  // 2. Loop over each one
  for (const beer of beers) {
    const nodeMeta = {
      id: createNodeId(`beer-${beer.name}`), // Nice little helper function to create a unqiue id
      parent: null,
      children: [],
      internal: {
        type: 'Beer', // Will specify our query name
        mediaType: 'application/json', // When sourcing a node it could be anything (imges, markdown), here we are saying its JSON and we put this here so any plugins can find it
        contentDigest: createContentDigest(beer), // An internal thing in Gatsby so it can tell if the data has changed.
      },
    };
    // 3. Create a node for that beers
    actions.createNode({
      ...beer,
      ...nodeMeta,
    });
  }
};

const turnSliceMastersIntoPages = async ({ graphql, actions }) => {
  // 1. Query all slicemasters
  const { data } = await graphql(`
    query SliceMastersQuery {
      sliceMasters: allSanityPerson {
        totalCount
        nodes {
          id
          name
          slug {
            current
          }
        }
      }
    }
  `);
  // 2. turn each slicemaster into their own page
  data.sliceMasters.nodes.forEach((sliceMaster) => {
    actions.createPage({
      // What is the URL for this new page??
      path: `slicemasters/${sliceMaster.slug.current}`,
      component: path.resolve('./src/templates/Slicemaster.js'),
      context: {
        name: sliceMaster.name,
        slug: sliceMaster.slug.current,
      },
    });
  });
  // 3. Figure our how many pages there are based on how many slicemasters there are, and how many per page
  const pageSize = parseInt(process.env.GATSBY_PAGE_SIZE);
  const pageCount = Math.ceil(data.sliceMasters.totalCount / pageSize);
  // 4. Loop from 1 to n and create the paegs for them
  Array.from({ length: pageCount }).forEach((_, i) => {
    actions.createPage({
      path: `/slicemasters/${i + 1}`,
      component: path.resolve('./src/pages/slicemasters.js'),
      // This data is passed to the template when we create it
      context: {
        skip: i * pageSize,
        currentPage: i + 1,
        pageSize,
      },
    });
  });
};

export const sourceNodes = async (params) => {
  // Fetch a list of beers and source them into our gatsby
  await Promise.all([fetchBeersAndTurnIntoNodes(params)]);
};

export const createPages = async (params) => {
  // create pages dynamically
  // Wait for all promises to be resolved before finishing this function
  await Promise.all([
    // 1. Pizzas
    turnToppingsIntoPage(params),
    // 2. Toppings
    turnPizzasIntoPage(params),
    // 3. slicemasters
    turnSliceMastersIntoPages(params),
  ]);

  // return (
  //   <div>

  //   </div>
  // )
};

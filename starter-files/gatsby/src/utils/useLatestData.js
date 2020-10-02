import { useEffect, useState } from 'react';

const gql = String.raw;

const deets = `
  _id
  name
  image {
    asset {
      url
      metadata {
        lqip
      }
    }
  }
`;

const useLatestData = () => {
  // Hot slices
  const [hotSlices, setHotslices] = useState();

  // Slicemasters
  const [slicemasters, setSlicemasters] = useState();

  // Use a side effect to fetch the data from the graphql endpoint
  useEffect(() => {
    // when the component load, fetch the data

    fetch(process.env.GATSBY_GRAPHQL_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query: gql`
          query {
            StoreSettings(id: "downtown") {
              name
              slicemaster {
                ${deets}
              }
              hotSlices {
                ${deets}
              }
            }
          }
        `,
      }),
    })
      .then((res) => res.json())
      .then((res) => {
        // TODO: check for errors
        const hotslices = res.data.StoreSettings.hotSlices;
        const { slicemaster } = res.data.StoreSettings;
        // set the data to state
        setHotslices(hotslices);
        setSlicemasters(slicemaster);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return { hotSlices, slicemasters };
};

export default useLatestData;

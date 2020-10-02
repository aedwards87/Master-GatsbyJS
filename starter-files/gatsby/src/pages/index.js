/* eslint-disable arrow-body-style */
import React from 'react';
import SEO from '../components/SEO';
import S from '../styles/Grids';
import useLatestData from '../utils/useLatestData';
import LoadingGrid from '../components/LoadingGrid';
import ItemGrid from '../components/ItemGrid';

const CurrentlySlicing = ({ slicemasters }) => {
  return (
    <div>
      <h2 className="center">
        <span className="mark tilt">Slicemasters working</span>
      </h2>
      <p>Standing by, ready to slice you up!</p>
      {!slicemasters && <LoadingGrid count={4} />}
      {slicemasters && !slicemasters?.length && (
        <p>No one is working right now!</p>
      )}
      {slicemasters?.length && <ItemGrid items={slicemasters} />}
    </div>
  );
};

const HotSlices = ({ hotSlices }) => {
  return (
    <div>
      <h2 className="center">
        <span className="mark tilt">Hot Slices avilable now!</span>
      </h2>
      <p>Come on by, buy the slice!</p>
      {!hotSlices && <LoadingGrid count={4} />}
      {hotSlices && !hotSlices?.length && <p>Nothing in the case</p>}
      {hotSlices?.length && <ItemGrid items={hotSlices} />}
    </div>
  );
};

const Index = () => {
  const { slicemasters, hotSlices } = useLatestData();
  return (
    <>
      <SEO />
      <div className="center">
        <h1>The best pizza Downtowm!</h1>
        <p>Open 11am to 11pm every single day!</p>
        <S.HomePageGrid>
          <CurrentlySlicing slicemasters={slicemasters} />
          <HotSlices hotSlices={hotSlices} />
        </S.HomePageGrid>
      </div>
    </>
  );
};

export default Index;

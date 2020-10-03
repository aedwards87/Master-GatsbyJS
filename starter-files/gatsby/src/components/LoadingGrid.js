/* eslint-disable arrow-body-style */
import React from 'react';
import S from '../styles/Grids';

const LoadingGrid = ({ count }) => {
  return (
    <S.ItemsGrid>
      {Array.from({ length: count }, (_, i) => (
        <S.Items key={`loading-${i}`}>
          <p>
            <span className="mark">loading...</span>
          </p>
          <img
            src="data:image/gif;base64,R0lGODlhAQABAIAAAP///wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw==
            "
            alt="Loading"
            className="loading"
            width="100%"
            height="180"
          />
        </S.Items>
      ))}
    </S.ItemsGrid>
  );
};

export default LoadingGrid;

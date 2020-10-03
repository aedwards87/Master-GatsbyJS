/* eslint-disable arrow-body-style */
import React from 'react';
import S from '../styles/Grids';

const ItemGrid = ({ items }) => {
  return (
    <S.ItemsGrid>
      {items.map((item) => (
        <S.Items key={item._id}>
          <p>
            <span className="mark">{item.name}</span>
          </p>
          <img
            // width="500"
            // height="400"
            src={`${item.image.asset.url}?w=500&h=400&fit=crop`}
            alt={item.name}
            style={{
              background: `url(${item.image.asset.metadata.lqip})`,
              backgroundSize: 'cover',
            }}
          />
        </S.Items>
      ))}
    </S.ItemsGrid>
  );
};

export default ItemGrid;

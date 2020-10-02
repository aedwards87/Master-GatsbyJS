/* eslint-disable arrow-body-style */
import React from 'react';
import styled from 'styled-components';

const Footer = () => {
  return (
    <S.Footer>
      <p>&copy; Slick's Slices {new Date().getFullYear()} </p>
    </S.Footer>
  );
};

const S = {
  Footer: styled.div`
    text-align: center;
  `,
};

export default Footer;

/* eslint-disable arrow-body-style */
import React from 'react';
import styled from 'styled-components';
// import PropTypes from 'prop-types';
import Footer from './Footer';
import Nav from './Nav';
import 'normalize.css';
import GlobalStyles from '../styles/GlobalStyles';
import Typography from '../styles/Typography';
import stripes from '../assets/images/stripes.svg';

const Layout = ({ children }) => {
  return (
    <>
      <GlobalStyles />
      <Typography />
      <S.SiteBorder>
        <S.Layout>
          <Nav />
          {children}
          <Footer />
        </S.Layout>
      </S.SiteBorder>
    </>
  );
};

const S = {
  Layout: styled.div`
    background: white;
    padding: 2rem;
  `,
  SiteBorder: styled.div`
    max-width: 1000px;
    margin: 12rem auto 4rem auto;
    margin-top: clamp(2rem, 10vw, 12rem);
    background: white url(${stripes});
    background-size: 1500px;
    padding: 5px;
    padding: clamp(5px, 1vw, 25px);
    box-shadow: 0 0 5px 3px rgba(0, 0, 0, 0.044);
    border: 5px solid white;
    @media (max-width: 1100px) {
      margin-left: 1.5rem;
      margin-right: 1.5rem;
    }
  `,
};

Layout.propTypes = {
  // children: PropTypes.object,
};

export default Layout;

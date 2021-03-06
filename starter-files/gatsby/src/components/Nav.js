/* eslint-disable arrow-body-style */
import { Link } from 'gatsby';
import React from 'react';
import styled from 'styled-components';
import Logo from './Logo';

const Nav = () => {
  return (
    <S.Nav sRotate={2}>
      <ul>
        <li>
          <Link to="/">Hot Now</Link>
        </li>
        <li>
          <Link to="/pizzas">Pizza Menu</Link>
        </li>
        <li className="logo-item">
          <Link to="/">
            <Logo />
          </Link>
        </li>
        <li>
          <Link to="/slicemasters">Slice Masters</Link>
        </li>
        <li>
          <Link to="/order">Order Ahead!</Link>
        </li>
      </ul>
    </S.Nav>
  );
};

const S = {
  Nav: styled.nav`
    margin-top: 2.5rem;
    .logo {
      transform: translateY(-30%);
    }
    ul {
      margin: 0;
      margin-top: -6rem;
      padding: 0;
      text-align: center;
      list-style: none;

      display: grid;
      grid-template-columns: 1fr 1fr auto 1fr 1fr;
      grid-gap: 2rem;
      align-items: center;
    }
    li {
      transform: rotate(${({ sRotate }) => sRotate}deg);
      order: 1;
      &:nth-child(2),
      &:nth-child(3),
      &:nth-child(5) {
        transform: rotate(-${({ sRotate }) => sRotate}deg);
      }
      &:hover {
        transform: rotate(${({ sRotate }) => sRotate - 2}deg);
      }
      a {
        font-size: 3rem;
        font-size: clamp(2.5rem, 3.3vw, 3.3rem);
        text-decoration: none;
        &:hover {
          color: var(--red);
        }
        &[aria-current='page'] {
          color: var(--red);
        }
        @media (max-width: 700px) {
          font-size: 2.5rem;
          font-size: clamp(1.8rem, 8vw, 2.5rem);
        }
        @media (max-width: 500px) {
          font-size: clamp(1.7rem, 5vw, 2.5rem);
        }
      }
    }
    @media (max-width: 600px) {
      --columns: 4;
      margin-bottom: 3rem;
      border-bottom: 1px solid var(--grey);
      padding-bottom: 3rem;
      ul {
        grid-template-rows: 8rem auto;
        grid-template-columns: repeat(var(--columns), 1fr);
        justify-items: center;
      }
      .logo-item {
        order: 0;
        grid-column: 1 / -1;
      }
      .logo {
        transform: translateY(-15%);
      }
    }
    @media (max-width: 500px) {
      --columns: 2;
    }
  `,
};

export default Nav;

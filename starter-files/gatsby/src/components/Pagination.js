import { Link, navigate } from 'gatsby';
/* eslint-disable arrow-body-style */
import React from 'react';
import styled from 'styled-components';

const Pagination = ({ pageSize, totalCount, currentPage, skip, base }) => {
  const totalPages = Math.ceil(totalCount / pageSize);
  const prevPage = currentPage - 1;
  const nextPage = currentPage + 1;
  const hasNextPage = nextPage <= totalPages;
  const hasPrevPage = prevPage >= 1;

  const handleNextAndPrev = (e) => {
    e.preventDefault();
    navigate(e.target.value);
  };

  return (
    <S.Pagination>
      <S.Button
        type="button"
        disabled={!hasPrevPage}
        onClick={handleNextAndPrev}
        value={`/${base}${prevPage > 1 ? `/${prevPage}` : ''}`}
        title="prev"
      >
        ← <span>Prev</span>
      </S.Button>
      {Array.from({ length: totalPages }, (_, i) => (
        <Link
          key={`page-${i}`}
          className={currentPage === 1 && i === 0 ? 'current' : ''}
          to={`/${base}${i > 0 ? `/${i + 1}` : ''}`}
        >
          {i + 1}
        </Link>
      ))}
      <S.Button
        type="button"
        disabled={!hasNextPage}
        onClick={handleNextAndPrev}
        value={`/${base}/${nextPage}`}
        title="next"
      >
        <span>Next</span> →
      </S.Button>
    </S.Pagination>
  );
};

const S = {
  Pagination: styled.div`
    display: flex;
    border: 1px solid var(--grey);
    margin: 2rem 0;
    border-radius: 5px;
    text-align: center;
    & > * {
      padding: 1rem;
      flex: 1;
      border-right: 1px solid var(--grey);
      text-decoration: none;
      &[aria-current],
      &.current {
        color: var(--red);
      }
      &[disabled] {
        pointer-events: none;
        color: var(--grey);
      }
      &:hover {
        color: var(--red);
      }
    }
    a,
    button {
      font-size: 2rem;
      font-size: clamp(1.5rem, 2.7vw, 2rem);
    }
  `,
  Button: styled.button`
    background: unset;
    color: var(--black);
    box-shadow: unset;
    border-right: ${({ title }) =>
      title === 'prev' ? '1px solid var(--grey)' : 'unset'};
    text-shadow: unset;
    @media (max-width: 700px) {
      span {
        display: none;
      }
    }
  `,
};

export default Pagination;

import styled from 'styled-components';

const S = {
  OrderForm: styled.form`
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 20px;
    fieldset {
      grid-column: span 2;
      max-height: 600px;
      overflow: auto;
      display: grid;
      gap: 1rem;
      align-content: start;
      &.order,
      &.menu {
        grid-column: span 1;
      }
    }
    .bakeBeans {
      display: none;
    }
    @media (max-width: 900px) {
      fieldset.order,
      fieldset.menu {
        grid-column: span 2;
      }
    }
  `,
  Menu: styled.div`
    display: grid;
    grid-template-columns: 100px 1fr;
    grid-template-rows: 1fr 1fr;
    gap: 0 1.3rem;
    align-content: center;
    align-items: center;
    margin: 1rem 0;
    position: relative;
    .gatsby-image-wrapper {
      grid-row: span 2;
      height: 100%;
    }
    p {
      margin: 0;
    }
    button {
      font-size: 1.5rem;
    }
    .button-grid {
      display: flex;
      flex-wrap: wrap;
      gap: 0.5rem;
    }
    .remove {
      background: none;
      color: var(--red);
      font-style: 3rem;
      position: absolute;
      top: 0;
      right: 0;
      box-shadow: none;
    }
  `,
};

export default S;

import styled from 'styled-components';

const S = {
  HomePageGrid: styled.div`
    display: grid;
    gap: 2rem;
    --columns: 2;
    grid-template-columns: repeat(var(--columns), minmax(auto, 1fr));
    @media (max-width: 800px) {
      --columns: 1;
    }
  `,
  ItemsGrid: styled.div`
    display: grid;
    gap: 2rem;
    grid-template-columns: 1fr 1fr;
  `,
  Items: styled.div`
    text-align: center;
    position: relative;
    img {
      font-size: 0;
    }
    p {
      transform: rotate(-2deg) translateY(-10px);
      position: absolute;
      left: 0;
      top: 0;
      margin: 0;
      width: 100%;
      @media (max-width: 400px) {
        font-size: 1.5rem;
      }
    }
    .mark {
      display: inline;
    }
    @keyframes shine {
      from {
        background-position: 200%;
      }
      to {
        background-position: -40px;
      }
    }
    img.loading {
      --shine: white;
      --background: var(--grey);
      background-image: linear-gradient(
        90deg,
        var(--background) 0px,
        var(--shine) 40px,
        var(--background) 80px
      );
      background-size: 500px;
      animation: shine 1s infinite linear;
    }
  `,
};

export default S;

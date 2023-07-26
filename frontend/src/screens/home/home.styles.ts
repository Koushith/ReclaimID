import { styled } from "styled-components";

export const HomeContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;

  h1 {
    font-size: 4rem;
    font-weight: 800;
    margin-top: 14rem;
  }

  .input {
    margin-top: 2rem;
    display: flex;
    flex-direction: column;
    .taken-text {
      color: #eb5757 !important;
      font-size: 1.2rem;
    }
    .sub-title {
      color: #6a737d;
      font-size: 2rem;
      margin-bottom: 2rem;
      text-align: center;
    }

    .form {
      margin: 0 auto;
      input {
        border: 1px solid rgb(106, 115, 125);
        font-size: 1.5rem;
        padding: 0.8rem 1rem;
        border-radius: 4px;
        min-width: 310px;
      }
      button {
        font-size: 1.5rem;
        cursor: pointer;
        padding: 0.8rem 1rem;
        font-weight: 600;
        border-radius: 4px;
        border: none;
        color: #fff;
        background: #09a844;
        margin-left: 1rem;
      }
    }
  }
`;

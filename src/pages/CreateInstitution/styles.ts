import styled from 'styled-components';

export const Form = styled.form`
  padding: 8rem;

  & fieldset {
    border: 0;

    & + fieldset {
      margin-top: 8rem;
    }
  }

  & legend {
    width: 100%;
    font-size: 3.2rem;
    padding-bottom: 3.2rem;
    border-bottom: 1px solid var(--color-input-border);
  }
`;

export const MapSection = styled.section`
  display: flex;
  flex-direction: column;
  border-radius: 0.8rem;
  overflow: hidden;
  /* margin: 6.4rem 0; */

  & > span {
    height: 5.6rem;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: var(--color-blue-lightest-2);
    text-decoration: none;
    color: var(--color-text-blue);
    font-size: 2rem;
  }
`;

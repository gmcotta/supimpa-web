import styled from 'styled-components';
import { darken } from 'polished';

export const Container = styled.button`
  display: flex;
  width: 100%;
  justify-content: center;
  align-items: center;
  height: 6.4rem;
  border-radius: 0.8rem;
  border: none;
  font-size: 2rem;
  text-decoration: none;
  background-color: var(--color-whatsapp);
  color: var(--color-light);
  transition: background-color 0.2s;

  &:hover {
    /* background-color: ${darken(0.05, '#37c77f')}; */
    background-color: ${darken(0.05, '#37c77f')};
    cursor: pointer;
  }
`;

import styled from 'styled-components';
import { darken } from 'polished';

type ButtonProps = {
  buttonColorType?: string;
};

type colorTypesProps = {
  [key: string]: string[];
};

const colorTypes: colorTypesProps = {
  error: ['var(--color-text-pink)', '#ff669d'],
  success: ['var(--color-whatsapp)', '#37c77f'],
};

export const Container = styled.button<ButtonProps>`
  display: flex;
  width: 100%;
  justify-content: center;
  align-items: center;
  height: 6.4rem;
  border-radius: 0.8rem;
  border: none;
  font-size: 2rem;
  text-decoration: none;
  background-color: ${props =>
    props.buttonColorType !== undefined &&
    colorTypes[props.buttonColorType][0]};
  color: var(--color-light);
  transition: background-color 0.2s;

  &:hover {
    background-color: ${props =>
      props.buttonColorType !== undefined &&
      darken(0.05, colorTypes[props.buttonColorType][1])};
    cursor: pointer;
  }

  & div {
    display: flex;
    align-items: center;
  }
`;

import { darken } from 'polished';
import styled, { css } from 'styled-components';

type WorkOnWeekendCardProps = {
  workOnWeekends: boolean;
};

export const ImagesSection = styled.section`
  & > img {
    width: 100%;
    height: 40rem;
    object-fit: cover;
  }
`;

export const ImagesSelector = styled.div`
  display: grid;
  justify-items: center;
  grid-template-columns: repeat(6, 1fr);
  row-gap: 1.6rem;
  margin: 1.6rem 1.6rem 0 1.6rem;

  & button {
    background: none;
    border: none;
    opacity: 0.3;

    &.active {
      opacity: 1;
    }
  }

  & img {
    width: 9.6rem;
    height: 9.6rem;
    object-fit: cover;
    border-radius: 0.8rem;

    &:hover {
      cursor: pointer;
    }
  }
`;

export const ContentSection = styled.section`
  padding: 6.4rem 8rem 8rem 8rem;

  & h1 {
    font-size: 4.8rem;
    text-align: center;
    color: var(--color-title-dark-blue);
  }

  & p {
    margin: 3.2rem 0;
    font-size: 2rem;
    color: var(--color-text-blue);
  }

  & h2 {
    font-size: 3.2rem;
    padding-top: 6.4rem;
    border-top: 1px solid var(--color-blue-dark);
    color: var(--color-title-dark-blue);
  }
`;

export const MapSection = styled.section`
  display: flex;
  flex-direction: column;
  border-radius: 0.8rem;
  overflow: hidden;
  margin: 6.4rem 0;

  & > a {
    height: 5.6rem;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: var(--color-blue-lightest-2);
    text-decoration: none;
    color: var(--color-text-blue);
    font-size: 2rem;
    transition: background-color 0.2s;

    &:hover {
      background-color: ${darken(0.05, '#e6f7fb')};
    }
  }
`;

export const InstructionCardsWrapper = styled.section`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  column-gap: 6.4rem;
`;

export const WorkingHoursCard = styled.div`
  background: linear-gradient(
    150deg,
    var(--color-blue-lightest-2) 8%,
    var(--color-white) 92%
  );
  padding: 3.2rem;
  border-radius: 0.8rem;
  border: 1px solid var(--color-blue-light);

  & div {
    margin-top: 2.4rem;
    display: flex;
    flex-direction: column;
    font-size: 1.6rem;
    color: var(--color-text-blue);

    & span + span {
      margin-top: 1.6rem;
    }
  }
`;

export const WorkOnWeekendsCard = styled.div<WorkOnWeekendCardProps>`
  ${props =>
    props.workOnWeekends
      ? css`
          background: linear-gradient(
            150deg,
            var(--color-green-lightest) 8%,
            var(--color-white) 92%
          );
        `
      : css`
          background: linear-gradient(
            150deg,
            var(--color-pink-lightest) 8%,
            var(--color-white) 92%
          );
        `};
  padding: 3.2rem;
  border-radius: 0.8rem;
  border: 1px solid
    ${props =>
      props.workOnWeekends
        ? 'var(--color-green-light)'
        : 'var(--color-pink-light)'};

  & svg {
    color: ${props =>
      props.workOnWeekends
        ? 'var(--color-text-green)'
        : 'var(--color-text-pink)'};
  }

  & div {
    margin-top: 2.4rem;
    display: flex;
    flex-direction: column;
    font-size: 1.6rem;
    color: ${props =>
      props.workOnWeekends
        ? 'var(--color-text-green)'
        : 'var(--color-text-pink)'};

    & span + span {
      margin-top: 1.6rem;
    }
  }
`;

export const WhatsappButton = styled.a`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 6.4rem;
  margin-top: 6.4rem;
  border-radius: 0.8rem;
  font-size: 2rem;
  text-decoration: none;
  background-color: var(--color-whatsapp);
  color: var(--color-light);
  transition: background-color 0.2s;

  &:hover {
    background-color: ${darken(0.05, '#37c77f')};
  }

  & svg {
    margin-right: 1.6rem;
  }
`;

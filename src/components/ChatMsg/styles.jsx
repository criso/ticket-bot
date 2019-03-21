import styled from '@emotion/styled';
import { spacing, colors, border } from '../../lib/constants/Styles';

export const Container = styled('div')`
  display: flex;
  > div {
    border-radius: ${border.radius};
    box-shadow: 0px 1px 3px 0px rgba(0, 0, 0, 0.2),
      0px 1px 1px 0px rgba(0, 0, 0, 0.14), 0px 2px 1px -1px rgba(0, 0, 0, 0.12);
    ${(props) => props.maxWidth && `max-width: ${props.maxWidth}`};
  }
`;

export const TextContainer = styled('div')`
  border-radius: ${border.radius};
  box-shadow: 0px 1px 3px 0px rgba(0, 0, 0, 0.2),
    0px 1px 1px 0px rgba(0, 0, 0, 0.14), 0px 2px 1px -1px rgba(0, 0, 0, 0.12);
  ${(props) => props.maxWidth && `max-width: ${props.maxWidth}`};
`;

export const Text = styled('div')`
  ${(props) =>
    props.borderColor &&
    `
      border-left: 4px solid ${props.borderColor};
      border-right: 4px solid ${props.borderColor};
    `}
  border-radius: ${border.radius};
  height: 100%;
  background: ${colors.bgSecondary};
  padding: ${spacing.medium};
  color: ${colors.text};
  align-items: center;
  display: flex;

  [role='img'] {
    font-size: ${spacing.large};
    margin-right: ${spacing.small};
  }
`;

export const AnswerContainer = styled(Container)`
  justify-content: flex-end;
`;

export const AnswerTextContainer = styled(TextContainer)`
  max-width: 40%;
`;

export const AnswerText = styled(Text)`
  background: ${colors.bgPrimary};
  color: #fff;
`;

export const ChatLine = styled('div')`
  width: 100%;
  padding: ${spacing.small} 0;
  list-style-type: none;
  display: flex;
  flex-direction: column;
`;

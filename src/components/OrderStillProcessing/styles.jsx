import styled from '@emotion/styled';
import { spacing } from '../../lib/constants/Styles';
export const Section = styled('section')`
  flex-direction: column;
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const PingSection = styled('section')`
  margin-top: ${spacing.medium};
  display: flex;
  align-items: center;
  > span {
    margin: ${spacing.small};
  }
  button {
    margin-left: ${spacing.small};
  }
`;

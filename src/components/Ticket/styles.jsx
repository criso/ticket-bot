import styled from '@emotion/styled';
import { spacing, colors } from '../../lib/constants/Styles';

export const Section = styled('section')`
  display: flex;
  justify-content: center;
  height: 100vh;
  background: ${colors.chatBg};
`;

export const ChatContainer = styled('div')`
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;
`;

export const ChatBodyContainer = styled('div')`
  flex-direction: column-reverse;
  display: flex;
  flex: 1;
  overflow-y: scroll;
`;

export const ChatBody = styled('section')`
  padding: ${spacing.xlarge} ${spacing.large} ${spacing.large};
`;

import styled from 'react-emotion';
import { spacing, colors } from '../../lib/constants/Styles';

export const Container = styled('div')`
  display: flex;
  align-items: center;
  justify-content: center;
  flex: 1;
`;

export const Message = styled('div')`
  padding: ${spacing.small};
  border: 1px solid ${colors.warning})};
  display: flex;
  align-items: center;
`;

export const Text = styled('div')`
  color: #000;
`;

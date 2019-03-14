import styled from '@emotion/styled';
import { spacing } from '../../lib/constants/Styles';

export const Section = styled('section')`
  display: flex;
  flex: 1;
  justify-content: center;
`;

export const Options = styled('ul')`
  margin: 0;
  padding: 0;
  display: flex;
  justify-content: center;
`;

export const Option = styled('li')`
  display: flex;
  margin: 0 ${spacing.medium} 0 0;

  :last-child {
    margin: 0;
  }
`;

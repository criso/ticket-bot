import styled from '@emotion/styled';
import { colors, spacing } from '../../lib/constants/Styles';

export const Section = styled('div')`
  color: #fff;
  display: flex;
  border-top: 1px solid ${colors.border};
  padding: ${spacing.large} ${spacing.medium};
  background: ${colors.bgSecondary};
`;

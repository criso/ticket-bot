import styled from '@emotion/styled';
import { colors, spacing } from '../../lib/constants/Styles';

export const Section = styled('div')`
  display: flex;
  border-top: 1px solid ${colors.border};
  padding: ${spacing.large} ${spacing.medium};

  min-height: 105px;
`;

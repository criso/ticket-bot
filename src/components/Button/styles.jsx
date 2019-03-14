import styled from '@emotion/styled';
import { colors, spacing } from '../../lib/constants/Styles';

export const BaseButton = styled('button')`
  cursor: pointer;
  border-radius: 2px;
  font-size: 14px;
  font-weight: 400;
  padding: ${spacing.small} ${spacing.medium};
  text-decoration: none;
  display: flex;
`;

export const PrimaryButton = styled(BaseButton)`
  background: ${colors.bgPrimary};
  color: #fff;
`;

export const SecondaryButton = styled(BaseButton)`
  background: ${colors.bgSecondary};
  color: #000;
`;

export const DisabledButton = styled(BaseButton)`
  pointer-events: none;
  cursor: default;
  background: ${colors.bgSecondary};
  color: #999;
  border: none;
`;

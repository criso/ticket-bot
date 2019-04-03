import styled from '@emotion/styled';
import { colors, spacing } from '../../lib/constants/Styles';

export const BaseButton = styled('button')`
  cursor: pointer;
  border-radius: 4px;
  padding: ${spacing.small} ${spacing.medium};
  text-decoration: none;
  display: flex;
  border: 1px solid transparent;
  display: flex;

  &:hover {
    border: 1px solid ${colors.border};
    svg {
      transform: scale(1.3);
    }
  }

  svg {
    transition: transform 300ms cubic-bezier(0.25, 0.46, 0.45, 0.94);
    margin-right: ${spacing.small};
  }
`;

export const PrimaryButton = styled(BaseButton)`
  background: ${colors.buttonBg};
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

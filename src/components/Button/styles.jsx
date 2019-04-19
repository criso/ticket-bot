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

    transition: all 800ms;
    background: #cddc39;
    color: #222;
    svg {
      transform: scale(1.3);
    }
  }

  svg {
    transition: transform 300ms cubic-bezier(0.18, 0.89, 0.32, 1.28);

    margin-right: ${spacing.small};
  }
`;

export const PrimaryButton = styled(BaseButton)`
  background: ${colors.buttonBg};
  color: #fff;
`;

export const SecondaryButton = styled(BaseButton)`
  background: #ddd;
  color: #000;
`;

export const DisabledButton = styled(BaseButton)`
  background: #fafafa;

  cursor: not-allowed;
  color: #999;
  border: none;

  svg {
    transition: none;
  }

  &:hover {
    border: none;
    svg {
      transform: none;
    }
  }
`;

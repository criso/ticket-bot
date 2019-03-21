import styled from '@emotion/styled';
import { spacing } from '../../lib/constants/Styles';

export const Section = styled('section')`
  display: flex;
  flex: 1;

  > form {
    flex: 1;
    display: flex;
    justify-content: flex-end;
    align-items: center;
  }

  input {
    font-size: 16px;
    padding: ${spacing.small};
    margin: 0 ${spacing.medium};
  }
`;

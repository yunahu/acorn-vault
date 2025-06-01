import { LoadingOutlined } from '@ant-design/icons';
import { Spin } from 'antd';
import styled from 'styled-components';

interface SpinnerProps {
  $left?: boolean;
}

// #region Styles

const SpinnerContainer = styled.div<SpinnerProps>`
  display: flex;
  align-items: center;
  padding: 15px;
  ${({ $left }) => $left && 'padding-left: 25px'}
  ${({ $left }) => !$left && 'justify-content: center;'}
`;

// #endregion

const Spinner = (props: SpinnerProps) => (
  <SpinnerContainer {...props}>
    <Spin indicator={<LoadingOutlined spin />} />
  </SpinnerContainer>
);

export default Spinner;

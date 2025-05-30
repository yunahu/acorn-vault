import { LoadingOutlined } from '@ant-design/icons';
import { Spin as AntSpin } from 'antd';
import styled from 'styled-components';

// #region Styles

const SpinContainer = styled.div<{ $left?: boolean }>`
  display: flex;
  align-items: center;
  padding: 15px;
  ${({ $left }) => $left && 'padding-left: 25px'}
  ${({ $left }) => !$left && 'justify-content: center;'}
`;

// #endregion

interface SpinProps {
  $left?: boolean;
}

const Spin = (props: SpinProps) => (
  <SpinContainer {...props}>
    <AntSpin indicator={<LoadingOutlined spin />} />
  </SpinContainer>
);

export default Spin;

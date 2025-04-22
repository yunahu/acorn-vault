import styled from 'styled-components';
import { Table as AntTable } from 'antd';
import type { TableProps } from 'antd';

const StyledAntTable = styled(AntTable)`
  .ant-table-row .ant-table-cell {
    &.editable {
      padding: 0px;

      &:has(> div) {
        padding: 16px;

        &:has(.ant-select) {
          padding: 0px;
        }
      }
    }
  }
`;

const Table = (props: TableProps) => {
  return <StyledAntTable {...(props as any)} bordered />;
};

export default Table;

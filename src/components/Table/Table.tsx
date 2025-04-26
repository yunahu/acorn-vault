import styled from 'styled-components';
import { Table as AntTable } from 'antd';
import type { TableProps as AntTableProps } from 'antd';

interface TableProps extends AntTableProps {
  loading?: boolean;
}

const StyledAntTable = styled(AntTable)`
  .ant-table {
    border-bottom-left-radius: 20px;
    border-bottom-right-radius: 20px;
    border: solid 0.5px ${({ theme }) => theme.colors.border};
  }

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
  return (
    <StyledAntTable {...(props as any)} loading={{ spinning: props.loading }} />
  );
};

export default Table;

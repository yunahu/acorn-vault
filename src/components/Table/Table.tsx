import { LoadingOutlined } from '@ant-design/icons';
import type { TableProps as AntTableProps } from 'antd';
import { Table as AntTable } from 'antd';
import styled from 'styled-components';

interface TableProps extends AntTableProps {
  loading?: boolean;
}

// #region Styles

const StyledAntTable = styled(AntTable<any>)`
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

// #endregion

const Table = ({ loading, ...rest }: TableProps) => {
  return (
    <StyledAntTable
      {...rest}
      loading={{ spinning: loading, indicator: <LoadingOutlined spin /> }}
    />
  );
};

export default Table;

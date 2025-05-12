import styled from 'styled-components';
import { useState } from 'react';
import dayjs, { Dayjs } from 'dayjs';
import RangePicker from './components/RangePicker/RangePicker';
import RecordsTable from './components/RecordsTable/RecordsTable';
import RecordStatsCard from 'src/components/cards/RecordStatsCard/RecordStatsCard';

// #region Styles

const Container = styled.div`
  background-color: ${({ theme }) => theme.colors.background};
  flex: 1;
  padding: 5%;
  display: flex;
  flex-direction: column;
  gap: 30px;
`;

// #endregion

export interface Range {
  start: Dayjs | null;
  end: Dayjs | null;
}

const Records = () => {
  const [range, setRange] = useState<Range>({
    start: dayjs().startOf('month'),
    end: dayjs().endOf('month'),
  });

  return (
    <Container>
      <RangePicker range={range} setRange={setRange} />
      <RecordsTable range={range} />
      <RecordStatsCard range={range} />
    </Container>
  );
};

export default Records;

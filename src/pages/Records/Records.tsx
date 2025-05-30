import dayjs, { Dayjs } from 'dayjs';
import { useState } from 'react';
import RecordStatsCard from 'src/components/cards/RecordStatsCard/RecordStatsCard';
import PageWrapper from 'src/components/layouts/PageWrapper/PageWrapper';
import RangePicker from './components/RangePicker/RangePicker';
import RecordsTable from './components/RecordsTable/RecordsTable';

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
    <PageWrapper>
      <RangePicker range={range} setRange={setRange} />
      <RecordsTable range={range} />
      <RecordStatsCard range={range} />
    </PageWrapper>
  );
};

export default Records;

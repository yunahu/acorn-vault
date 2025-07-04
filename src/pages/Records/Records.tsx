import dayjs, { Dayjs } from 'dayjs';
import { useState } from 'react';
import ExpenseCurrencyBreakdownCard from 'src/components/cards/currencyBreakdownCards/ExpenseCurrencyBreakdownCard/ExpenseCurrencyBreakdownCard';
import IncomeCurrencyBreakdownCard from 'src/components/cards/currencyBreakdownCards/IncomeCurrencyBreakdownCard/IncomeCurrencyBreakdownCard';
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
      <IncomeCurrencyBreakdownCard range={range} />
      <ExpenseCurrencyBreakdownCard range={range} />
    </PageWrapper>
  );
};

export default Records;

import { faMinus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { DatePicker, DatePickerProps } from 'antd';
import { Dayjs } from 'dayjs';
import { Dispatch, SetStateAction } from 'react';
import styled from 'styled-components';
import { Range } from 'src/pages/Records/Records';

interface RangePickerProps {
  range: Range;
  setRange: Dispatch<SetStateAction<Range>>;
}

// #region Styles

const Container = styled.div`
  display: flex;
  justify-content: center;
  gap: 15px;
  align-items: center;
`;

const StyledDash = styled(FontAwesomeIcon)`
  height: 16px;
`;

// #endregion

const RangePicker = ({ range, setRange }: RangePickerProps) => {
  const setStart: DatePickerProps['onChange'] = (date: Dayjs | null) => {
    setRange((x) => ({ start: date, end: x.end }));
  };
  const setEnd: DatePickerProps['onChange'] = (date) => {
    setRange((x) => ({ start: x.start, end: date }));
  };

  return (
    <Container>
      <DatePicker
        placeholder="Start date"
        onChange={setStart}
        defaultValue={range.start}
      />
      <StyledDash icon={faMinus} />
      <DatePicker
        placeholder="End date"
        onChange={setEnd}
        defaultValue={range.end}
      />
    </Container>
  );
};

export default RangePicker;

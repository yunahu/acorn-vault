import { DatePicker, DatePickerProps } from 'antd';
import { useState } from 'react';

interface EditablePickerProps extends DatePickerProps {
  onChange: DatePickerProps['onChange'];
}

const EditableDate = (props: EditablePickerProps) => {
  const [active, setActive] = useState<boolean>(false);
  const { defaultValue } = props;

  return active ? (
    <DatePicker
      {...props}
      autoFocus
      defaultOpen
      onOpenChange={() => setActive(false)}
    />
  ) : (
    <div
      onClick={() => {
        setActive(true);
      }}
    >
      {defaultValue?.toISOString().substring(0, 10) ?? ''}
    </div>
  );
};

export default EditableDate;

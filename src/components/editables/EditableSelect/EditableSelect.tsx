import { useState } from 'react';
import { Select, SelectProps } from 'antd';
import styled from 'styled-components';

const StyledSelect = styled(Select)`
  width: 100%;
`;

interface EditableSelectProps extends SelectProps {
  text: string;
}

const EditableSelect = (props: EditableSelectProps) => {
  const [active, setActive] = useState<boolean>(false);
  const { text } = props;

  return active ? (
    <StyledSelect
      {...props}
      autoFocus
      defaultOpen
      allowClear
      onDropdownVisibleChange={() => setActive(false)}
    />
  ) : (
    <div
      onClick={() => {
        setActive(true);
      }}
    >
      {text}
    </div>
  );
};

export default EditableSelect;

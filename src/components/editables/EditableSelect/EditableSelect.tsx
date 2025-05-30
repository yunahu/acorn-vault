import { Select, SelectProps } from 'antd';
import { useState } from 'react';
import styled from 'styled-components';

interface EditableSelectProps extends SelectProps {
  text: string;
}

const StyledSelect = styled(Select)`
  width: 100%;
`;

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

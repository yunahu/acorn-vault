import styled from 'styled-components';
import { InputHTMLAttributes, useState } from 'react';

// #region Styles

const StyledInput = styled.input`
  padding: 10px 15px;
  width: 99%;
  border-radius: 1px;

  &::-webkit-outer-spin-button,
  &::-webkit-inner-spin-button {
    /* display: none; <- Crashes Chrome on hover */
    -webkit-appearance: none;
    margin: 0; /* <-- Apparently some margin are still there even though it's hidden */
  }

  //  &[type='number'] {
  //    -moz-appearance: textfield; /* Firefox */
  //  }
`;

// #endregion

interface EditableInputProps extends InputHTMLAttributes<HTMLInputElement> {
  type: 'text' | 'number';
  initialValue: string;
  onOk: (value: string) => void;
  prefix?: string;
}

const EditableInput = (props: EditableInputProps) => {
  const [active, setActive] = useState<boolean>(false);
  const { type, initialValue, onOk } = props;
  const [value, setValue] = useState<string>(initialValue);

  return active ? (
    <StyledInput
      type={type}
      autoFocus
      defaultValue={initialValue}
      onChange={(evt) => setValue(evt.currentTarget.value)}
      onBlur={() => {
        setValue(initialValue);
        setActive(false);
      }}
      onKeyDown={(evt) => {
        if (evt.key === 'Enter') {
          onOk(value);
          setActive(false);
        } else if (evt.key === 'Escape') {
          setValue(initialValue);
          setActive(false);
        }
      }}
    />
  ) : (
    <div
      onClick={() => {
        setActive(true);
      }}
    >
      {props?.prefix}
      {type === 'number' ? parseFloat(value).toFixed(2) : value}
    </div>
  );
};

export default EditableInput;

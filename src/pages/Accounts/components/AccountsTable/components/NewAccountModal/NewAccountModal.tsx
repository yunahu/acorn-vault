import styled from 'styled-components';
import { ChangeEvent, useEffect, useState } from 'react';
import { Button, Modal } from 'antd';
import { useCurrencies } from 'src/hooks/useCurrencies';
import api from 'src/services/axios';

// #region Styles

const StyledButton = styled.button`
  padding: 10px;
  background-color: white;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  color: ${({ theme }) => theme.colors.darkGray};
  border: solid 1px ${({ theme }) => theme.colors.darkGray};

  &:hover {
    color: ${({ theme }) => theme.colors.secondary};
    border: solid 1px ${({ theme }) => theme.colors.secondary};
  }
`;

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const BalanceInput = styled.input`
  &::-webkit-outer-spin-button,
  &::-webkit-inner-spin-button {
    /* display: none; <- Crashes Chrome on hover */
    -webkit-appearance: none;
    margin: 0; /* <-- Apparently some margin are still there even though it's hidden */
  }

  &[type='number'] {
    -moz-appearance: textfield; /* Firefox */
  }
`;

// #endregion

interface FormData {
  name: string;
  currency_id: number;
  balance: number;
  isPrimaryPaymentMethod: string;
}

const NewAccountModal = () => {
  const [open, setOpen] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [formData, setFormData] = useState<FormData>({} as FormData);
  const currencies = useCurrencies();

  const handleChange = (
    evt: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement>
  ) => {
    const { name, value } = evt.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const showModal = () => {
    setOpen(true);
  };

  const handleOk = async () => {
    setLoading(true);

    const { name, currency_id, balance, isPrimaryPaymentMethod } = formData;

    await api.post('/accounts', {
      name,
      currency_id,
      balance,
      is_primary_payment_method:
        isPrimaryPaymentMethod === 'yes' ? true : false,
    });

    setLoading(false);
    setOpen(false);
  };

  const handleCancel = () => {
    setOpen(false);
    setLoading(false);
  };

  useEffect(() => {
    setFormData({
      name: 'New account',
      currency_id: 1,
      balance: 0,
      isPrimaryPaymentMethod: 'yes',
    });
  }, [open]);

  return (
    <div>
      <StyledButton onClick={showModal}>+ New account</StyledButton>
      <Modal
        title="Add a new account"
        open={open}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={[
          <Button key="back" onClick={handleCancel}>
            Cancel
          </Button>,
          <Button
            key="submit"
            type="primary"
            loading={loading}
            onClick={handleOk}
          >
            Create
          </Button>,
        ]}
      >
        <StyledForm onSubmit={handleOk}>
          <label htmlFor="name">Name</label>
          <input
            type="text"
            name="name"
            id="name"
            value={formData.name}
            onChange={handleChange}
          />
          <label htmlFor="currency_id">Currency</label>
          <select
            name="currency_id"
            id="currency_id"
            value={formData.currency_id}
            onChange={handleChange}
          >
            {currencies.map((currency) => (
              <option key={currency.id} value={currency.id}>
                {currency.code}
              </option>
            ))}
          </select>
          <label htmlFor="balance">Balance</label>
          <BalanceInput
            type="number"
            name="balance"
            id="balance"
            value={formData.balance}
            onChange={handleChange}
          />
          <label htmlFor="primaryPaymentMethod">
            Is this a primary payment method?
          </label>
          <select
            name="isPrimaryPaymentMethod"
            id="isPrimaryPaymentMethod"
            value={formData.isPrimaryPaymentMethod}
            onChange={handleChange}
          >
            <option key="yes" value="yes">
              Yes
            </option>
            <option key="no" value="no">
              No
            </option>
          </select>
        </StyledForm>
      </Modal>
    </div>
  );
};

export default NewAccountModal;

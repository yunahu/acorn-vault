import styled from 'styled-components';
import { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Button, Modal } from 'antd';
import { useCurrencies } from 'src/hooks/useCurrencies';
import { createAccount } from 'src/services/axios';

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

  // TODO:
  //  &[type='number'] {
  //    -moz-appearance: textfield; /* Firefox */
  //  }
`;

// #endregion

const NewAccountModal = () => {
  const [open, setOpen] = useState<boolean>(false);
  const [name, setName] = useState<string>('New account');
  const [currencyId, setCurrencyId] = useState<number>(1);
  const [balance, setBalance] = useState<string>('0');
  const [isPrimaryPaymentMethod, setIsPrimaryPaymentMethod] =
    useState<boolean>(true);
  const currencies = useCurrencies();
  const queryClient = useQueryClient();
  const createAccountMutation = useMutation({
    mutationFn: () =>
      createAccount(name, currencyId, balance, isPrimaryPaymentMethod),
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['accounts'] });
      setOpen(false);
      setName('New account');
      setCurrencyId(1);
      setBalance('0');
      setIsPrimaryPaymentMethod(true);
    },
    mutationKey: ['createAccount'],
  });

  const handleCancel = () => {
    setName('New account');
    setCurrencyId(1);
    setBalance('0');
    setIsPrimaryPaymentMethod(true);
    setOpen(false);
  };

  const handleOk = () => {
    createAccountMutation.mutate();
  };

  return (
    <div>
      <StyledButton onClick={() => setOpen(true)}>+ New account</StyledButton>
      <Modal
        title="Create a new account"
        open={open}
        onCancel={handleCancel}
        footer={[
          <Button key="back" onClick={handleCancel}>
            Cancel
          </Button>,
          <Button
            key="submit"
            type="primary"
            loading={createAccountMutation.isPending}
            onClick={handleOk}
          >
            Create
          </Button>,
        ]}
      >
        <StyledForm>
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={name}
            onChange={(evt) => setName(evt.target.value)}
          />
          <label htmlFor="currencyId">Currency</label>
          <select
            id="currencyId"
            name="currencyId"
            value={currencyId}
            onChange={(evt) => setCurrencyId(parseInt(evt.target.value))}
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
            id="balance"
            name="balance"
            value={balance}
            onChange={(evt) => setBalance(evt.target.value)}
          />
          <label htmlFor="isPrimaryPaymentMethod">
            Is this a primary payment method?
          </label>
          <select
            id="isPrimaryPaymentMethod"
            name="isPrimaryPaymentMethod"
            value={isPrimaryPaymentMethod ? 'true' : 'false'}
            onChange={(evt) =>
              setIsPrimaryPaymentMethod(evt.target.value === 'true')
            }
          >
            <option key="true" value="true">
              Yes
            </option>
            <option key="false" value="false">
              No
            </option>
          </select>
        </StyledForm>
      </Modal>
    </div>
  );
};

export default NewAccountModal;

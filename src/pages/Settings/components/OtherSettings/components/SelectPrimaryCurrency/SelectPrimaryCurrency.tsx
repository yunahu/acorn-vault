import { useMemo } from 'react';
import styled from 'styled-components';
import { Select } from 'antd';
import { useCurrencies } from 'src/hooks/useCurrencies';
import useSettingsQueryMutations from 'src/hooks/useSettingsQueryMutations';
import Spin from 'src/components/Spin/Spin';

// #region Styles

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 300px;
`;

const StyledLabel = styled.label`
  height: 27px;
`;

// #endregion

const SelectPrimaryCurrency = () => {
  const { currencies } = useCurrencies();
  const { settingsQuery, updateSettingsMutation } = useSettingsQueryMutations();

  const currenciesOptions = useMemo(
    () =>
      currencies.map(({ id, name, code }) => ({
        label: `${name} (${code})`,
        value: id,
      })),
    [currencies]
  );

  return (
    <Container>
      <StyledLabel htmlFor="primary_currency">Primary Currency </StyledLabel>
      {settingsQuery.isLoading ? (
        <Spin $left />
      ) : (
        <Select
          loading={settingsQuery.isLoading}
          id="primary_currency"
          placeholder="Select primary currency"
          options={currenciesOptions}
          defaultValue={settingsQuery.data?.primary_currency}
          onChange={(newCurrencyId) => {
            if (newCurrencyId !== settingsQuery.data?.primary_currency)
              updateSettingsMutation.mutate({
                primary_currency: newCurrencyId,
              });
          }}
        />
      )}
    </Container>
  );
};

export default SelectPrimaryCurrency;

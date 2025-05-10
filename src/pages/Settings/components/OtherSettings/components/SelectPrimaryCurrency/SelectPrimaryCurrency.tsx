import { useMemo, useState } from 'react';
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
  const [loading, setLoading] = useState(false);
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
          disabled={settingsQuery.isLoading || loading}
          loading={settingsQuery.isLoading || loading}
          id="primary_currency"
          placeholder="Select primary currency"
          options={currenciesOptions}
          defaultValue={settingsQuery.data?.primary_currency}
          onChange={(newCurrencyId) => {
            setLoading(true);
            if (newCurrencyId !== settingsQuery.data?.primary_currency)
              updateSettingsMutation.mutate(
                {
                  primary_currency: newCurrencyId,
                },
                {
                  onSettled: () => {
                    setLoading(false);
                  },
                }
              );
          }}
        />
      )}
    </Container>
  );
};

export default SelectPrimaryCurrency;

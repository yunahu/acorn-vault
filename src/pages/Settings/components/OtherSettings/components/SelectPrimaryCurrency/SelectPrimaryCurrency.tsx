import { Select } from 'antd';
import { useMemo } from 'react';
import {
  ItemContainer,
  ItemLabel,
} from 'src/components/layouts/TabLayouts/TabLayouts';
import Spinner from 'src/components/spinners/Spinner/Spinners';
import { useSettingsQuery, useUpdateSettings } from 'src/hooks/settings';
import { useCurrencies } from 'src/hooks/useCurrencies';

const SelectPrimaryCurrency = () => {
  const { currencies } = useCurrencies();
  const settingsQuery = useSettingsQuery();
  const updateSettings = useUpdateSettings();

  const currenciesOptions = useMemo(
    () =>
      currencies.map(({ id, name, code }) => ({
        label: `${name} (${code})`,
        value: id,
      })),
    [currencies]
  );

  return (
    <ItemContainer>
      <ItemLabel htmlFor="primary_currency">Primary Currency </ItemLabel>
      {settingsQuery.isLoading ? (
        <Spinner $left />
      ) : (
        <Select
          disabled={settingsQuery.isLoading || updateSettings.isPending}
          loading={settingsQuery.isLoading || updateSettings.isPending}
          id="primary_currency"
          placeholder="Select primary currency"
          options={currenciesOptions}
          defaultValue={settingsQuery.data?.primary_currency}
          onChange={(newCurrencyId) => {
            if (newCurrencyId !== settingsQuery.data?.primary_currency)
              updateSettings.mutate({
                primary_currency: newCurrencyId,
              });
          }}
        />
      )}
    </ItemContainer>
  );
};

export default SelectPrimaryCurrency;

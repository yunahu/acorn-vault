import { Select } from 'antd';
import { useMemo, useState } from 'react';
import {
  ItemContainer,
  ItemLabel,
} from 'src/components/layouts/TabLayouts/TabLayouts';
import Spin from 'src/components/Spin/Spin';
import { useCurrencies } from 'src/hooks/useCurrencies';
import useSettingsQueryMutations from 'src/hooks/useSettingsQueryMutations';

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
    <ItemContainer>
      <ItemLabel htmlFor="primary_currency">Primary Currency </ItemLabel>
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
    </ItemContainer>
  );
};

export default SelectPrimaryCurrency;

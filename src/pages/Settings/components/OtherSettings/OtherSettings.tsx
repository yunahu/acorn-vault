import { TabContainer } from 'src/components/layouts/TabLayouts/TabLayouts';
import SelectPrimaryCurrency from './components/SelectPrimaryCurrency/SelectPrimaryCurrency';

const OtherSettings = () => {
  return (
    <TabContainer>
      <SelectPrimaryCurrency />
    </TabContainer>
  );
};

export default OtherSettings;

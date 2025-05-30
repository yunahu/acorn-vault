import { Tabs, TabsProps } from 'antd';
import styled from 'styled-components';
import PageWrapper from 'src/components/layouts/PageWrapper/PageWrapper';
import OtherSettings from './components/OtherSettings/OtherSettings';
import Profile from './components/Profile/Profile';

// #region Styles

const Wrapper = styled.div`
  margin-left: 1px;
  background-color: white;
  padding-top: 16px;
  border-bottom-left-radius: 8px;
  border-bottom-right-radius: 8px;
`;

// #endregion

const items: TabsProps['items'] = [
  {
    key: '1',
    label: 'Profile',
    children: (
      <Wrapper>
        <Profile />
      </Wrapper>
    ),
  },
  {
    key: '2',
    label: 'Others',
    children: (
      <Wrapper>
        <OtherSettings />
      </Wrapper>
    ),
  },
];

const Settings = () => {
  return (
    <PageWrapper>
      <Tabs
        tabBarStyle={{ margin: 0 }}
        type="card"
        items={items}
        destroyInactiveTabPane
      />
    </PageWrapper>
  );
};

export default Settings;

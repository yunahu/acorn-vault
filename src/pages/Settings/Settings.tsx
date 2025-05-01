import styled from 'styled-components';
import { Tabs, TabsProps } from 'antd';
import Profile from './components/Profile/Profile';
import OtherSettings from './components/OtherSettings/OtherSettings';

// #region Styles

const Container = styled.div`
  background-color: ${({ theme }) => theme.colors.background};
  flex: 1;
  padding: 5%;
  display: flex;
  flex-direction: column;
  gap: 30px;
`;

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
    <Container>
      <Tabs
        tabBarStyle={{ margin: 0 }}
        type="card"
        items={items}
        destroyInactiveTabPane
      />
    </Container>
  );
};

export default Settings;

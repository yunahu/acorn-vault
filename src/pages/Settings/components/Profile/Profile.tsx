import styled from 'styled-components';
import { Input } from 'antd';
import { Spin as AntSpin } from 'antd';
import { deleteUser, getAuth, updateProfile } from 'firebase/auth';
import { KeyboardEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import BasicButton from 'src/components/buttons/BasicButton/BasicButton';
import { deleteUserAccount } from 'src/services/api';

// #region Styles

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 30px;
  padding: 50px;
`;

const ItemContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 300px;
`;

const StyledLabel = styled.label`
  height: 27px;
`;

// #endregion

const Profile = () => {
  const auth = getAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleUpdate = (evt: KeyboardEvent<HTMLInputElement>) => {
    if (auth.currentUser) {
      if (
        evt.currentTarget.value &&
        evt.currentTarget.value !== auth.currentUser.displayName
      ) {
        updateProfile(auth.currentUser, {
          displayName: evt.currentTarget.value,
        }).catch((err) => {
          console.error(err);
        });
      }
    }
    evt.currentTarget.blur();
  };

  const deleteAccount = async () => {
    setLoading(true);
    if (auth.currentUser) {
      try {
        await deleteUserAccount();
        await deleteUser(auth.currentUser);
      } catch (err) {
        console.error(err);
      }
    }
    navigate('/signin');
  };

  return (
    <Container>
      {loading && <AntSpin fullscreen></AntSpin>}
      <ItemContainer>
        <StyledLabel>User name</StyledLabel>
        <Input
          disabled={!auth.currentUser}
          defaultValue={auth.currentUser?.displayName ?? 'New user name'}
          onPressEnter={handleUpdate}
        />
      </ItemContainer>
      <ItemContainer>
        <BasicButton onClick={deleteAccount}>Delete account</BasicButton>
      </ItemContainer>
    </Container>
  );
};

export default Profile;
